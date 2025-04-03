import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { db } from "./src/lib/auth/db";

//konsole.log("Using db in auth.ts:", db);

// Importa los providers y demás configuraciones que ya tienes en auth.config.ts
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./src/lib/auth/zod";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { sendEmailVerification } from "./src/lib/auth/mail";

export const { handlers, signIn, signOut, auth } = NextAuth({  
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google,
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid credentials");
        }
        const user = await db.user.findUnique({
          where: { email: data.email },
        });
        if (!user || !user.password) {
          throw new Error("No user found");
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        if (!user.emailVerified) {
          const verifyTokenExits = await db.verificationToken.findFirst({
            where: { identifier: user.email },
          });
          if (verifyTokenExits?.identifier) {
            await db.verificationToken.delete({
              where: { identifier: user.email },
            });
          }
          const token = nanoid();
          await db.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });
          await sendEmailVerification(user.email, token);
          throw new Error("Please check Email send verification");
        }
        return user;
      },
    }),
  ],
  
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return {
        ...session,
        user: { ...session.user, role: (user?.role || token.role || "") as string, }, 
      };
    },
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/login",
  },
});
