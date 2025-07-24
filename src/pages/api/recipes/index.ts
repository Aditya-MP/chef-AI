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
      const recipes = await Recipe.find({ userId });
      return res.status(200).json(recipes);
    }
    case 'POST': {
      const { userId, title, ingredients, instructions, image } = req.body;
      if (!userId || !title || !ingredients || !instructions)
        return res.status(400).json({ error: 'Missing fields' });
      const recipe = await Recipe.create({ userId, title, ingredients, instructions, image });
      return res.status(201).json(recipe);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
