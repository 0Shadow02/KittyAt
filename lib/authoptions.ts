
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prismadb";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"

export const authoptions={
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
       
          async authorize(credentials: any) {
            if (!credentials) return null;
          
            const { username, password } = credentials;
          
            // Check if user exists
            const user = await prisma.user.findFirst({
              where: { email: username }
            });
          
            // If user exists, verify password
            if (user) {
              if (bcrypt.compareSync(password, user.password || "")) {
                return { id: user.id, email: user.email };
              } else {
                throw new Error('Invalid credentials');
              }
            } else {
              // Register new user
              const hashedPassword = bcrypt.hashSync(password, 10);
              const newUser = await prisma.user.create({
                data: {
                  email: username,
                  password: hashedPassword
                }
              });
              const uname = newUser.email.split("@")[0];
              return { id: newUser.id, email: newUser.email, name: uname };
            }
          }
          }),


        GoogleProvider({
          clientId: process.env.GOOGLE_ID || "",
          clientSecret: process.env.GOOGLE_SECRET || "",
          async profile(profile){
            const user = await prisma.user.upsert({  
              where: { email: profile.email },  
              update: {}, 
              create: {    
                email: profile.email || "",
              }  
            });  
            return {  
              id: user.id,  
              name: profile.name,  
              email: user.email, 
              image: profile.picture 
            }
          }
        },
        
      ),
        GithubProvider({
          clientId: process.env.GITHUB_ID || "",
          clientSecret: process.env.GITHUB_SECRET || "",
          async profile(profile){
            const user = await prisma.user.upsert({  
              where: { email: profile.email || ""},  
              update: {}, 
              create: {    
                email: profile.email || "", 
              }  
            });  
            return {  
              id: user.id,  
              name: profile.name,  
              email: user.email,
              image: profile.picture   
            }
          }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      jwt: async ({ user, token }: any) => {
      if (user) {
          token.uid = user.id;
      }
      return token;
      },
    
    session: ({ session, token }: any) => {
        if (session.user) {
            session.user.id = token.uid
        }
        return session
    }
  },
  }