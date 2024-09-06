import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { env } from "@/env";
import { db } from "@/server/db";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      const s = {
        ...session,
        user: {
          ...session.user
        },
      };
      return s;
    },
  },
  session: {
    strategy: "jwt",
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
        const user = await db
          .select()
          .from(users)
          .where(and(eq(users.email, credentials.email)))
          .limit(1);

        if (!user || user.length < 1) {
          return null;
        }
        if (
          !(await bcrypt.compare(
            credentials.password,
            user[0]!.password as string,
          ))
        ) {
          return null;
        }
        return { id: user[0]!.id, email: user[0]!.email };
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
