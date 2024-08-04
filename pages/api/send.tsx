// api/send.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function send(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kobepain2021@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: 'kobepain2021@gmail.com', // your email
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    } else {
      res.send({
        success: true,
        message: 'Thanks for contacting us. We will get back to you shortly',
      });
    }
  });
}
