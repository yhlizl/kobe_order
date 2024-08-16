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
    const { status, banknumber,memo,quantity,pickupdate,total,newOrderId,orderId } = req.body;
    switch (method) {
      case 'GET':
        const orders = await pool.query(`
                SELECT o.*, p.name AS productName, p.imageUrl, u.email as useremail, u.name as username, u.phone as userphone, u.address as useraddress,o.banknumber
                FROM verceldb.orders o 
                JOIN verceldb.products p ON o.productId = p.productId 
                JOIN verceldb.users u ON o.userId = u.userId
                order by o.date desc
              `);
        res.status(200).json(orders.rows);
        break;
      case 'POST':
        const { userId, orderStatus, productId } = req.body;
     
        await pool.query(
          'INSERT INTO verceldb.orders (orderId,userId, total, status, productId, quantity,banknumber) VALUES ($1, $2, $3, $4, $5,$6,$7)',
          [newOrderId,userId, total, orderStatus, productId, quantity,banknumber],
        );
        res.status(201).json({ message: 'Order created successfully' });
        break;
      case 'PUT': 
        console.log('change order status', orderId, status, banknumber,memo);
        if (status) {
          console.log('start change status',orderId,status);
          await pool.query(
            'UPDATE verceldb.orders SET status = $1 WHERE orderId = $2',
            [status, orderId],
          );
        }
        if (banknumber){  
          console.log('start change banknumber',orderId,banknumber);
          await pool.query(
            'UPDATE verceldb.orders SET banknumber = $1 WHERE orderId = $2',
            [banknumber, orderId],
          );
        }
        if (memo){  
          console.log('start change memo',orderId,memo);
          await pool.query(
            'UPDATE verceldb.orders SET memo = $1 WHERE orderId = $2',
            [memo, orderId],
          );
        }
        if (pickupdate){
          console.log('start change memo',orderId,memo);
          await pool.query(
            'UPDATE verceldb.orders SET pickupdate = $1 WHERE orderId = $2',
            [pickupdate, orderId],
          );
        }
        if (quantity){
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET quantity = $1 WHERE id = $2',
            [quantity, id],
          );
        }
        if (total){
          console.log('start change memo',id,memo);
          await pool.query(
            'UPDATE verceldb.orders SET total = $1 WHERE id = $2',
            [total, id],
          );
        }
        if (orderId){
          console.log('start change memo',id,orderId);
          await pool.query(
            'UPDATE verceldb.orders SET orderId = $1 WHERE id = $2',
            [orderId, id],
          );
        }

        if (status || banknumber || memo || pickupdate || quantity || total) {
          res.status(200).json({ message: 'Order updated successfully' });
        }
        break;
      case 'DELETE':
        try {
          await pool.query('DELETE FROM verceldb.orders WHERE id = $1', [
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
