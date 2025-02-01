import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
};