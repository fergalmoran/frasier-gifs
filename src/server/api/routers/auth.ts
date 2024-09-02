import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { users } from "@/server/db/schema";

export const authRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.insert(users).values({
        email: input.email,
        password: input.password,
      });
      return user;
    }),
});
