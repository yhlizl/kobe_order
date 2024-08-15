// mailUtil.js
import nodemailer from 'nodemailer';
export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kkobepann@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'kkobepann@gmail.com',
    to: to,
    subject:  `[KOBE Pann 口碑烘焙坊] (勿回覆) ` + subject,
    html: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
};
