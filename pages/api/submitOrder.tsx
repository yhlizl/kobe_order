// pages/api/submitOrder.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { needLogin } from '@/middleware/needLogin';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await needLogin(req, res, async () => {
    console.log('req.body', req.body);
    const { userEmail, total, status, productId, quantity } = req.body;
    let userid = 0;
    try {
      const user = await pool.query(
        `
        SELECT * FROM verceldb.users WHERE email = $1
      `,
        [userEmail],
      );
      userid = user.rows[0].userid;
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Submit failed', error: (error as Error).message });
    }
    try {
      const result = await pool.query(
        `
        INSERT INTO verceldb.orders (userId, total, status, productId, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
        [userid, total, status, productId, quantity],
      );

      res
        .status(200)
        .json({ message: 'Submit successful', order: result.rows[0] });
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Submit failed', error: (error as Error).message });
    }
  });
}
