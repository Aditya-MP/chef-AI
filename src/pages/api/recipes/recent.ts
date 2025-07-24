import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/mongodb';
import Recipe from '@/model/recipe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 }).limit(10);
      return res.status(200).json(recipes);
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
