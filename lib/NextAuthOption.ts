import type { NextAuthOptions } from "next-auth";
import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/user/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; role: string };
  }
  interface User extends DefaultUser {
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        try {
          await connectMongoDB();
          const userExist = await UserModel.findOne({ email });
          if (!userExist) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            password,
            userExist.password
          );
          if (!passwordMatch) {
            return null;
          }

          return userExist;
        } catch (error) {
          console.log("Next auth", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
        token.id = user.id;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
