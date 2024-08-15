// api/resetPassword.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import {sendMail} from '@/utils/mailUtil'
import bcrypt from 'bcrypt';

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  // Generate a new random password
  const newPassword = Math.random().toString(36).slice(-8);
  const { userEmail } = req.body;
  try {
    const result = await pool.query(
      `
     select * from verceldb.users WHERE email = $1
    `,
      [userEmail],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log('error', error);
    res
      .status(500)
      .json({ message: 'Get failed', error: (error as Error).message });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await pool.query(
      `
      UPDATE verceldb.users SET password = $1 WHERE email = $2
    `,
      [hashedPassword, userEmail],
    );
  } catch (error) {
    console.log('error', error);
    res
      .status(500)
      .json({ message: 'Get failed', error: (error as Error).message });
  }

  // Send the new password to the user's email address
  const subject = 'Password Reset';
  const html = `
    <h1>Password Reset</h1>
    <p>您的新密碼是: <strong>${newPassword}</strong></p>
    <p>請登入後立即更改密碼。</p>
  `;
  await sendMail(userEmail, subject, html);

  res.status(200).json({ message: 'Password reset successful' });
}