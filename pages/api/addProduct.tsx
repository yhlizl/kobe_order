// pages/api/addProduct.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '@/middleware/admin';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await requireAdmin(req, res, async () => {
    console.log('req.body', req.body);
    const {
      name,
      price,
      description,
      imageUrl,
      quantity,
      estimatedProductionTime,
    } = req.body;

    try {
      const result = await pool.query(
        `
        INSERT INTO verceldb.products (name, price, description, imageUrl, quantity, estimatedProductionTime)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
        [name, price, description, imageUrl, quantity, estimatedProductionTime],
      );

      res
        .status(200)
        .json({ message: 'Add successful', product: result.rows[0] });
    } catch (error) {
      console.log('error', error);
      res
        .status(500)
        .json({ message: 'Add failed', error: (error as Error).message });
    }
  });
}
