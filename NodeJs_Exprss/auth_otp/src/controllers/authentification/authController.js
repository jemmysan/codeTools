import ErrorHandler from "../../middlewares/errorHandler.js";
import crypto from 'crypto';
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { User } from "../../models/userModel.js";
import { sendVerificationCode } from "../../utils/auth/sendVerificationCode.js";
import { sendEmail } from "../../utils/auth/sendEmail.js";

import { sendToken } from "../../utils/auth/sendToken.js";


//===========  Methode d'inscription Utilisateur  ==============
export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    
    // Validation des champs requis
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("Tous les champs sont requis.", 400));
    }

    // Validation du numéro de téléphone
    function validatePhoneNumber(phone) {
      const phoneRegex = /^\+221(77|76|78|70)\d{7}$/;
      return phoneRegex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler("Numéro de téléphone invalide.", 400));
    }

    // Vérifier si un utilisateur VERIFIÉ existe déjà
    const existingVerifiedUser = await User.findOne({
      $or: [
        { email, accountVerified: true },
        { phone, accountVerified: true },
      ],
    });

    if (existingVerifiedUser) {
      return next(new ErrorHandler("Ce numéro ou email est déjà utilisé.", 400));
    }

    // Vérifier si un utilisateur NON VERIFIÉ existe déjà
    const existingUnverifiedUser = await User.findOne({
      $or: [
        { email, accountVerified: false },
        { phone, accountVerified: false },
      ],
    });

    // Cas 1: Utilisateur non vérifié existe déjà → régénérer le code OTP
    if (existingUnverifiedUser) {
      // Vérifier les tentatives de registration
      const registrationAttempts = await User.countDocuments({
        $or: [
          { phone, accountVerified: false },
          { email, accountVerified: false },
        ],
      });

      if (registrationAttempts > 3) {
        return next(
          new ErrorHandler(
            "Vous avez dépassé le nombre maximum de tentatives (3). Réessayez dans une heure.",
            400
          )
        );
      }

      // Régénérer le code de vérification
      const verificationCode = await existingUnverifiedUser.generateVerificationCode();
      await existingUnverifiedUser.save();

      // Envoyer le nouveau code
      await sendVerificationCode(
        verificationMethod,
        verificationCode,
        existingUnverifiedUser.name,
        existingUnverifiedUser.email,
        existingUnverifiedUser.phone,
        res
      );

      return; // Important: arrêter l'exécution ici
    }

    // Cas 2: Aucun utilisateur existant → créer un nouveau user
    const userData = { name, email, phone, password };
    const newUser = await User.create(userData);
    const verificationCode = await newUser.generateVerificationCode();
    await newUser.save();

    // Envoyer le code de vérification
    await sendVerificationCode(
      verificationMethod,
      verificationCode,
      newUser.name,
      newUser.email,
      newUser.phone,
      res
    );

  } catch (error) {
    console.error("Register error:", error);
    next(error);
  }
});



//===========  Methode de connexion  ==============

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }
  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  sendToken(user, 200, "User logged in successfully.", res);
});


//===========  Methode de déconnexion  ==============

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});


//===========  Methode de changement môt de passe  ==============

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "MERN AUTHENTICATION APP RESET PASSWORD",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler(
        error.message ? error.message : "Cannot send reset password token.",
        500
      )
    );
  }
});


//===========  Methode de réinitialisation môt de passe  ==============

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Reset Password Successfully.", res);
});