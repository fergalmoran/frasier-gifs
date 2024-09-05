import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  RequestInternal,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { api } from "@/trpc/server";
import { env } from "@/env";
import { db } from "@/server/db";

import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _request) => {
        if (!credentials) {
          return null;
        }
        const result = await api.auth.login({
          email: credentials.email,
          password: credentials.password,
        });
        if (!result) {
          return null;
        }
        return { id: result.id, email: result.email };
      },
    }),
  ],

  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    newUser: "/register",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
