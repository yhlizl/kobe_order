import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body;

  try {
    const db = process.env.POSTGRES_DATABASE;
    const {
      rows: [users],
    } = await pool.query(`SELECT * FROM ${db}.users WHERE email = $1`, [email]);

    if (users && Array.isArray(users) && users.length > 0) {
      const user: any = users[0];
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({
          message: 'Login successful',
          userId: user.userId,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Login failed', error: (error as Error).message });
  }
}
