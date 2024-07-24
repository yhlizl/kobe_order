// pages/api/addProduct.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import pool from '../../utils/db'
import NextAuthOptions from '@/pages/api/auth/[...nextauth]'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session : any= await getServerSession( req, res,NextAuthOptions);
  console.log(" session",session)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }
  if (!session || !session.user || session.user.name !== 'Admin' || session.user.email !== 'admin@kobe.pann') {
    console.log("not admin");
    return res.status(403).json({ message: 'You must be an admin to perform this action.' });
  }

  const { name, price, description, imageUrl, quantity, estimatedProductionTime } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO verceldb.products (name, price, description, imageUrl, quantity, estimatedProductionTime)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, price, description, imageUrl, quantity, estimatedProductionTime]);

    res.status(200).json({ message: 'Add successful', product: result.rows[0] });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: 'Add failed', error: (error as Error).message });
  }
}