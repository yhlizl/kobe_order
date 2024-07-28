import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { requireAdmin } from '@/middleware/admin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { productId },
    method,
  } = req;

  await requireAdmin(req, res, async()=>{
    switch (method) {
        case 'PUT':
          const { name, price, description, imageurl, quantity, estimatedProductionTime } = req.body;
          await pool.query('UPDATE verceldb.products SET name = $1, price = $2, description = $3, imageurl = $4, quantity = $5, estimatedProductionTime = $6 WHERE productId = $7', [name, price, description, imageurl, quantity, estimatedProductionTime, productId]);
          res.status(200).json({ message: 'Product updated successfully' });
          break;
        case 'DELETE':
          try {
            await pool.query('UPDATE verceldb.products SET isDeleted = true WHERE productId = $1', [productId]);
            res.status(200).json({ message: 'Product deleted successfully' });
          } catch (error) {
            console.log("error",error) // handle error
          } 
          break;
        default:
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
          res.status(405).end(`Method ${method} Not Allowed`);
      }
  })
}