// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, email, password, phone } = req.body;

  try {
    // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    // your application becomes.
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = process.env.POSTGRES_DATABASE;
    const {
      rows: [result],
    } = await pool.query(
      `INSERT INTO ${db}.users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, hashedPassword, phone],
    );
    res.status(200).json({
      message: 'Registration successful',
      userId: (result as any).insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Registration failed',
      error: (error as Error).message,
    });
  }
}
