import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  res.setHeader('Set-Cookie', serialize('chefai_auth', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  }));
  res.status(200).json({ success: true });
}
