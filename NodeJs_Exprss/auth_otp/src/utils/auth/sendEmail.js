import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  // 1. Créer un transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true pour 465, false pour 587
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2. Options de l'email
  const mailOptions = {
    from: `"O'Food" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    html: message,
  };

  // 3. Envoi de l'email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email could not be sent");
  }

};

// export const sendEmail = async ({ email, subject, message }) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMTP_HOST,
//     service: process.env.SMTP_SERVICE,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const options = {
//     from: process.env.SMTP_MAIL,
//     to: email,
//     subject,
//     html: message,
//   };
//   await transporter.sendMail(options);
// };


