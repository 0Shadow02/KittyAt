import { subtle } from "crypto"; // Edge-compatible crypto module
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

// Function to hash the password before storing or verifying
async function hashPassword(password: string): Promise<Uint8Array> {
  const encoder = new TextEncoder(); // Create a TextEncoder
  const data = encoder.encode(password); // Encode the password string as Uint8Array
  const hashed = await subtle.digest('SHA-256', data); // Hashing the password with SHA-256

  return new Uint8Array(hashed); // Return the hashed password as a Uint8Array
}

// Function to compare entered password with stored hash
async function verifyPassword(storedHash: Uint8Array, enteredPassword: string): Promise<boolean> {
  const hashedEnteredPassword = await hashPassword(enteredPassword); // Hash the entered password
  return storedHash.every((byte, index) => byte === hashedEnteredPassword[index]); // Compare byte by byte
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Fetch user from database
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          // Convert stored password hash to Uint8Array (assuming stored hash is Uint8Array)
          const storedHash = new Uint8Array(Buffer.from(user.password, 'base64')); 

          // Compare entered password with stored hash
          const passwordsMatch = await verifyPassword(storedHash, password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
