import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/model/user';
import { dbConnect } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  return res.status(200).json({ id: user._id, email: user.email, name: user.name });
}
