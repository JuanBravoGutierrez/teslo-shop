//import { DefaultSession, DefaultUser } from "@auth/core";
//import NextAuth, { type DefaultSession } from "next-auth";
import { type DefaultSession } from "next-auth";

//declare module "@auth/core" {
declare module "next-auth" {
  interface Session {
    user: {
      //id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}