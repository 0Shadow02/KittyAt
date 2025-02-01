import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user'; // Replace with your user retrieval logic

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (passwordsMatch) {
    return res.status(200).json({ user });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
}