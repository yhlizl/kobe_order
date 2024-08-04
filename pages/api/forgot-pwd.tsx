import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle forgot password logic here
  res.status(200).json({ message: 'Password reset email sent' });
}
