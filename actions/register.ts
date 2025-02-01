"use server";

import * as z from "zod";
import { subtle } from "crypto"; // Using Edge-compatible crypto module
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import prisma from "@/lib/prismadb";

// Function to hash the password before storing
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder(); // Create a TextEncoder
  const data = encoder.encode(password); // Encode the password string as Uint8Array
  const hashed = await subtle.digest('SHA-256', data); // Hashing the password with SHA-256
  
  // Convert the hashed Uint8Array to a Base64 string
  return btoa(String.fromCharCode(...new Uint8Array(hashed)));
}

// Function to compare entered password with stored hash
async function verifyPassword(storedHash: string, enteredPassword: string): Promise<boolean> {
  const hashedEnteredPassword = await hashPassword(enteredPassword); // Hash the entered password
  return storedHash === hashedEnteredPassword; // Compare the hashes
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  // Hash the password using SHA-256 and convert to Base64
  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Store the Base64-encoded password in the database
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
};
