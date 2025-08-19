import { User } from "../../models/userModel.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { sendToken } from "./sendToken.js";

//===========  Methode de verification du code OTP  ==============
export const verifyOTP = catchAsyncError(async (req, res, next) => {
    const { email, otp, phone } = req.body;

    function validatePhoneNumber(phone) {
        const phoneRegex = /^\+221(77|76|78|70)\d{7}$/;
        return phoneRegex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
        return next(new ErrorHandler("Invalid phone number.", 400));
    }

    try {
        // Recherche des utilisateurs non vérifiés
        const userAllEntries = await User.find({
            $or: [
                { email, accountVerified: false },
                { phone, accountVerified: false }
            ]
        }).sort({ createdAt: -1 });

        // Vérification si le tableau est vide
        if (userAllEntries.length === 0) {
            return next(new ErrorHandler("User not found or already verified.", 404));
        }

        let user;

        if (userAllEntries.length > 1) {
            user = userAllEntries[0]; // Prend le plus récent
            // Supprime les doublons
            await User.deleteMany({
                _id: { $ne: user._id },
                $or: [
                    { phone, accountVerified: false },
                    { email, accountVerified: false }
                ]
            });
        } else {
            user = userAllEntries[0];
        }

        // Vérification que user existe
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Vérification du code OTP
        if (user.verificationCode !== Number(otp)) {
            return next(new ErrorHandler("Invalid OTP.", 400));
        }

        // Vérification de l'expiration
        const currentTime = Date.now();
        const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();
        
        if (currentTime > verificationCodeExpire) {
            return next(new ErrorHandler("OTP Expired.", 400));
        }

        // Mise à jour de l'utilisateur
        user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpire = null;
        await user.save({ validateModifiedOnly: true });

        sendToken(user, 200, "Account Verified.", res);
        
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return next(new ErrorHandler("Internal Server Error.", 500));
    }
});