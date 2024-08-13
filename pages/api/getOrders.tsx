// pages/api/getOrders.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { needLogin } from '@/middleware/needLogin';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await needLogin(req, res, async () => {
    console.log('req.body', req.body);
    const { userEmail } = req.body;
    let userid = 0;
    try {
      const user = await pool.query(
        `
        SELECT * FROM verceldb.users WHERE email = $1 order by userid desc
      `,
        [userEmail],
      );
      userid = user.rows[0].userid;
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Get failed', error: (error as Error).message });
    }
    try {
      const result = await pool.query(
        `
        SELECT o.*, p.name AS productName ,p.imageUrl
        FROM verceldb.orders o
        JOIN verceldb.products p ON o.productId = p.productId
        WHERE o.userId = $1
        order by o.orderId desc
      `,
        [userid],
      );

      res.status(200).json({ message: 'Get successful', order: result.rows });
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Get failed', error: (error as Error).message });
    }
  });
}
