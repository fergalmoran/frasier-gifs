import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { images } from "@/server/db/schema";

const imageCreateType = {
  title: z.string().min(5),
  description: z.string(),
  tags: z.array(z.string()),
};

export const imageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object(imageCreateType))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db
        .insert(images)
        .values({
          title: input.title,
          description: input.description,
          tags: input.tags,
          createdById: ctx.session.user.id,
        })
        .returning();
      if (!post[0]) {
        throw new Error("Failed to create image");
      }
      return {
        id: post[0].id,
      };
    }),
});
