import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { db } from "./db";



export const authOptions: NextAuthOptions = {

  secret: process.env.NEXTAUTH_SECRET as string, // Ensure this environment variable is set in your production environment

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, profile, user }) => {

      if (account && account.provider === "google") {
        let existingUser = await db.user.findUnique({
          where: { email: profile?.email },
        });

        if (!existingUser) {
          // console.log("Creating new user with Google profile:", profile);
          const username = profile?.email?.split('@')[0]; // Using email prefix as username
          existingUser = await db.user.create({
            data: {
              email: profile?.email as string,
              username: username || null,
              password: null, // Or you can use null
            },
          });
        }
        token.uid = existingUser.id;
        token.email = existingUser.email;
        token.username = existingUser.username;
      } else if (user) {
        token.uid = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session?.user,
        id: token.uid, // Add this line to include the user ID
        email: token.email ?? null,
        name: token.name ?? null,
      },
    }),
  },
};
