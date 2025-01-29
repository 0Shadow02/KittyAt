"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const eventCategories = await prisma.eventCategory.findMany();
    res.status(200).json(eventCategories);
  } catch (error) {
    console.error("Error fetching event categories:", error);
    res.status(500).json({ error: "Error fetching event categories" });
  }
}