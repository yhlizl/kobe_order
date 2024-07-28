import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { requireAdmin } from '@/middleware/admin'


// CREATE TABLE IF NOT EXISTS verceldb.orders (
//     orderId SERIAL PRIMARY KEY,
//     userId INT,
//     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     total DECIMAL(10, 2),
//     status VARCHAR(255),
//     productId INT,
//     quantity INT,
//     FOREIGN KEY (userId) REFERENCES verceldb.users(userId),
//     FOREIGN KEY (productId) REFERENCES verceldb.products(productId)
//   )


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
      query: { id },
      method,
    } = req;
    await requireAdmin(req, res, async()=>{
      switch (method) {
          case 'GET':
            const orders = await pool.query('SELECT * FROM verceldb.orders');
            res.status(200).json(orders.rows);
            break;
          case 'POST':
            const { userId, total, orderStatus, productId, quantity } = req.body;
            await pool.query('INSERT INTO verceldb.orders (userId, total, status, productId, quantity) VALUES ($1, $2, $3, $4, $5)', [userId, total, orderStatus, productId, quantity]);
            res.status(201).json({ message: 'Order created successfully' });
            break;
          case 'PUT':
            const { status } = req.body;
            await pool.query('UPDATE verceldb.orders SET status = $1 WHERE orderId = $2', [status, id]);
            res.status(200).json({ message: 'Order updated successfully' });
            break;
          case 'DELETE':
            try {
              await pool.query('DELETE FROM verceldb.orders WHERE orderId = $1', [id]);
              res.status(200).json({ message: 'Order deleted successfully' });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'An error occurred while deleting the order.' });
            }
            break;
          default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
  }