import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { requireAdmin } from '@/middleware/admin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { productId },
    method,
  } = req;

  await requireAdmin(req, res, async()=>{
    try {
        if (req.method === 'POST') {
          const { query } = req.body;
          console.log("query",query)
          const result = await pool.query(query);
          res.status(200).json({ result }); 
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
  })
}