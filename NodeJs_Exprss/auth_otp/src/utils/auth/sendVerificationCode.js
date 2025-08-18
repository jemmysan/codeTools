import twilio from 'twilio';
import { generateEmailTemplate } from "../../templates/emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

//===========  Methode d'envoie de code de verification  ==============

export async function sendVerificationCode( verificationMethod, verificationCode, name, email, phone, res)
{
  try {
    if (verificationMethod === "email") {
      // Envoi par mail
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({ email, subject: "Your Verification Code", message });
      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
    }  else if (verificationMethod === "phone") {
      // Envoi par SMS
      await client.messages.create({
        body: `Your verification code is: ${verificationCode}`,
        from: phoneNumber,
        to: phone,
      });
      res.status(200).json({ success: true, message: "OTP sent via SMS" });
    } 
    else if (verificationMethod === "whatsapp") {
      // Envoi par WhatsApp
      await client.messages.create({
        body: `Your verification code is: ${verificationCode}`,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${phone}`,
      });
      res.status(200).json({ success: true, message: "OTP sent via WhatsApp" });
    } 
    else {
      res.status(400).json({ success: false, message: "Invalid verification method" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}
