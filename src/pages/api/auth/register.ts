import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/model/user';
import { dbConnect } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  await dbConnect();
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, name });
  return res.status(201).json({ id: user._id, email: user.email, name: user.name });
}
