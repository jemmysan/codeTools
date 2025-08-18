import { User } from "../../models/userModel.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";

//===========  Methode de verification du code OTP  ==============

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp, phone } = req.body;

  function validatePhoneNumber(phone) {
    const phoneRegex = /^\+923\d{9}$/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  try {
    const userAllEntries = await User.find({
      $or: [
        {
          email,
          accountVerified: false,
        },
        {
          phone,
          accountVerified: false,
        },
      ],
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user;

    if (userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { phone, accountVerified: false },
          { email, accountVerified: false },
        ],
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();
    console.log(currentTime);
    console.log(verificationCodeExpire);
    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account Verified.", res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});