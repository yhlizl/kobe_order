import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { requireAdmin } from '@/middleware/admin';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;
  await requireAdmin(req, res, async () => {
    const { status, banknumber,memo,quantity,pickupdate,total  } = req.body;
    console.log('orderid', id, status, banknumber);
    switch (method) {
      case 'GET':
        const orders = await pool.query(`
                SELECT o.*, p.name AS productName, p.imageUrl, u.email as useremail, u.name as username, u.phone as userphone, u.address as useraddress,o.banknumber
                FROM verceldb.orders o 
                JOIN verceldb.products p ON o.productId = p.productId 
                JOIN verceldb.users u ON o.userId = u.userId
                ORDER BY o.orderId DESC
              `);
        res.status(200).json(orders.rows);
        break;
      case 'POST':
        const { userId, orderStatus, productId } = req.body;
        await pool.query(
          'INSERT INTO verceldb.orders (userId, total, status, productId, quantity,banknumber) VALUES ($1, $2, $3, $4, $5,$6)',
          [userId, total, orderStatus, productId, quantity,banknumber],
        );
        res.status(201).json({ message: 'Order created successfully' });
        break;
      case 'PUT':
        console.log('change order status', id, status, banknumber,memo);
        if (status) {
          console.log('start change status',id,status);
          await pool.query(
            'UPDATE verceldb.orders SET status = $1 WHERE orderId = $2',
            [status, id],
          );
        }
        if (banknumber){  
          console.log('start change banknumber',id,banknumber);
          await pool.query(
            'UPDATE verceldb.orders SET banknumber = $1 WHERE orderId = $2',
            [banknumber, id],
          );
        }
        if (memo){  
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET memo = $1 WHERE orderId = $2',
            [memo, id],
          );
        }
        if (pickupdate){
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET pickupdate = $1 WHERE orderId = $2',
            [pickupdate, id],
          );
        }
        if (quantity){
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET quantity = $1 WHERE orderId = $2',
            [quantity, id],
          );
        }
        if (total){
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET total = $1 WHERE orderId = $2',
            [total, id],
          );
        }

        if (status || banknumber || memo || pickupdate || quantity || total) {
          res.status(200).json({ message: 'Order updated successfully' });
        }
        break;
      case 'DELETE':
        try {
          await pool.query('DELETE FROM verceldb.orders WHERE orderId = $1', [
            id,
          ]);
          res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ message: 'An error occurred while deleting the order.' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
