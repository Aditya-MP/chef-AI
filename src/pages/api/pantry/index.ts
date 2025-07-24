import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongodb';
import User from '@/model/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      const user = await User.findById(userId);
      return res.status(200).json(user?.pantry || []);
    }
    case 'POST': {
      const { userId, pantry } = req.body;
      if (!userId || !pantry)
        return res.status(400).json({ error: 'Missing fields' });
      await User.findByIdAndUpdate(userId, { pantry });
      return res.status(200).json({ success: true });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
