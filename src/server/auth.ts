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
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!user?.email) {
        return token;
      }
      const u = await db
        .select()
        .from(users)
        .where(and(eq(users.email, user.email)))
        .limit(1);

      if (!u?.[0]) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      const session = u[0];
      return {
        id: session.id,
        name: session.name,
        email: session.email,
        picture: session.image,
      };
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
        if (!(await bcrypt.compare(credentials.password, user[0]!.password!))) {
          return null;
        }
        const session = { id: user[0]!.id, email: user[0]!.email };
        return session;
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
