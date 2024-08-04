// pages/api/getProducts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await pool.query(
      'SELECT * FROM verceldb.products where isDeleted = false',
    );
    // console.log("result", result)
    res
      .status(200)
      .json({ message: 'Fetch successful', products: result.rows });
  } catch (error) {
    // console.log("error", error)
    res
      .status(500)
      .json({ message: 'Fetch failed', error: (error as Error).message });
  }
}
