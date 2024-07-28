import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { requireAdmin } from '@/middleware/admin'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;
  await requireAdmin(req, res, async()=>{
    switch (method) {
        case 'GET':
          const users = await pool.query('SELECT * FROM verceldb.users');
          res.status(200).json(users.rows);
          break;
        case 'PUT':
          const { email, name, phone, address } = req.body;
          await pool.query('UPDATE verceldb.users SET email = $1, name = $2, phone = $3, address = $4 WHERE userId = $5', [email, name, phone, address, id]);
          res.status(200).json({ message: 'User updated successfully' });
          break;
        case 'DELETE':
          try {
            await pool.query('DELETE FROM verceldb.users WHERE userId = $1', [id]);
            res.status(200).json({ message: 'User deleted successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while deleting the user.' });
          }
          break;
        default:
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
          res.status(405).end(`Method ${method} Not Allowed`);
      }
  })
}