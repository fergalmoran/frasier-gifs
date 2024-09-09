import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const authRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
    .mutation(async ({ ctx, input }) => {
      const profileImage = faker.image.avatar();
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await ctx.db.insert(users).values({
        email: input.email,
        password: hashedPassword,
        image: profileImage,
      });
      return user;
    }),
});
