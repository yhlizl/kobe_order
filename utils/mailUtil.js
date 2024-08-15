// // mailUtil.js
// import nodemailer from 'nodemailer';
// export const sendMail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'kkobepann@gmail.com',
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: 'kkobepann@gmail.com',
//     to: to,
//     subject: subject,
//     text: text,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error(`Failed to send email: ${error}`);
//   }
// };

// module.exports = sendMail;