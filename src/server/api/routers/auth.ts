import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";

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
});
