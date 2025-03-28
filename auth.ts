import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

import authConfig from "./auth.config";
import { db } from "./src/lib/auth/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "database" },
  ...authConfig,
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aquí es donde puedes agregar información adicional al token.
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
    session({ session, token, user }) { // se elimina ": typeof session"
      if (session.user) {
        session.user.role = token.role as string; // forzamos el tipo
      }
      return {
        ...session,
        user: { 
          ...session.user, 
          role: user.role, },
      }
    },
  },
  events: {
    // El evento linkAccount se dispara cuando una cuenta (proveedor OAuth: GitHub, Google, Facebook, etc.)  se vincula a un usuario existente en tu base de datos.
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  pages: {
    signIn: "/login",
  },
});