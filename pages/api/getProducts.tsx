// pages/api/getProducts.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import pool from '../../utils/db'
import NextAuthOptions from '@/pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session : any = await getServerSession(req, res, NextAuthOptions);
  console.log(" session", session)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  if (!session || !session.user || session.user.name !== 'Admin' || session.user.email !== 'admin@kobe.pann') {
    console.log("not admin");
    return res.status(403).json({ message: 'You must be an admin to perform this action.' });
  }

  try {
    const result = await pool.query('SELECT * FROM verceldb.products');
    console.log("result", result)
    res.status(200).json({ message: 'Fetch successful', products: result.rows });
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: 'Fetch failed', error: (error as Error).message });
  }
}