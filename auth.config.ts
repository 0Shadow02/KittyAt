import { subtle } from 'crypto'; 
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

// Hash password using SHA-256 (Edge-friendly)
async function hashPassword(password: string): Promise<Uint8Array> {
  const encoder = new TextEncoder(); // Create a TextEncoder
  const data = encoder.encode(password); // Encode the string as Uint8Array
  const hashed = await subtle.digest('SHA-256', data); // Hashing with SHA-256

  return new Uint8Array(hashed); // Return hashed password as Uint8Array
}

// Compare hashed passwords
async function verifyPassword(storedHash: Uint8Array, password: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return storedHash.every((byte, index) => byte === hashedPassword[index]); // Compare byte by byte
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

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          // Assuming user.password is stored as a SHA-256 hash
          const storedHash = Uint8Array.from(atob(user.password), c => c.charCodeAt(0)); // Convert base64 string to Uint8Array
          const passwordsMatch = await verifyPassword(storedHash, password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
