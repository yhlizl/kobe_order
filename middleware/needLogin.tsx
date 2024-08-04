import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import NextAuthOptions from '@/pages/api/auth/[...nextauth]';

export const needLogin = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) => {
  const session: any = await getServerSession(req, res, NextAuthOptions);
  console.log(' session', session);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  if (!session || !session.user) {
    console.log('not admin');
    return res
      .status(403)
      .json({ message: 'You must be an admin to perform this action.' });
  }

  next();
};
