import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";

export const authRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await ctx.db.insert(users).values({
        email: input.email,
        password: hashedPassword,
      });
      return user;
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
    .query(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await ctx.db
        .select()
        .from(users)
        .where(
          and(eq(users.email, input.email), eq(users.password, hashedPassword)),
        )
        .limit(1);

      return user[0];
    }),
});
