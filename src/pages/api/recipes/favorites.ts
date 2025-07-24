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
      const recipes = await Recipe.find({ userId, isFavorite: true });
      return res.status(200).json(recipes);
    }
    case 'POST': {
      const { userId, recipeId } = req.body;
      if (!userId || !recipeId)
        return res.status(400).json({ error: 'Missing fields' });
      await Recipe.findByIdAndUpdate(recipeId, { isFavorite: true });
      return res.status(200).json({ success: true });
    }
    case 'DELETE': {
      const { userId, recipeId } = req.body;
      if (!userId || !recipeId)
        return res.status(400).json({ error: 'Missing fields' });
      await Recipe.findByIdAndUpdate(recipeId, { isFavorite: false });
      return res.status(200).json({ success: true });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
