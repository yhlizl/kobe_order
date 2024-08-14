import type { NextApiRequest, NextApiResponse } from 'next';
import { needLogin } from '@/middleware/needLogin';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await needLogin(req, res, async () => {

    const {id, status, banknumber } = req.body;
    try {
        console.log('change order status', id, status, banknumber);
        if (status && status.length > 0) {
          await pool.query(
            'UPDATE verceldb.orders SET status = $1 WHERE orderId = $2',
            [status, id],
          );
        }
        if (banknumber && banknumber.length > 0){  
          await pool.query(
            'UPDATE verceldb.orders SET banknumber = $1 WHERE orderId = $2',
            [banknumber, id],
          );
        }
        if (status || banknumber) {
          res.status(200).json({ message: 'Order updated successfully' });
        }
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Modified failed', error: (error as Error).message });
    }
  });
}
