import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { z } from "zod";
import { images, users } from "@/server/db/schema";
import { env } from "@/env";
import { and, eq } from "drizzle-orm";

export const imageRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const image = (
        await ctx.db
          .select()
          .from(images)
          .where(and(eq(images.slug, input.slug)))
          .limit(1)
      )[0];
      if (!image) {
        throw new Error("Image not found");
      }
      return {
        id: image.id,
        title: image.title,
        description: image.description,
        tags: image.tags,
        url: `${env.IMAGE_BASE_URL}/${image.filePath}`,
      };
    }),
  getTrending: publicProcedure.query(async ({ ctx }) => {
    const trending = await ctx.db.query.images.findMany({
      orderBy: (images, { desc }) => [desc(images.createdAt)],
    });
    return (
      trending.map((t) => {
        return {
          id: t.id,
          title: t.title,
          description: t.description,
          tags: t.tags,
          url: `${env.IMAGE_BASE_URL}/${t.filePath}`,
        };
      }) ?? null
    );
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5),
        description: z.string(),
        tags: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      var slugify = slugifyWithCounter();
      var found = false;
      var slug = "";
      do {
        slug = slugify(input.title);
        const existing = await ctx.db
          .select()
          .from(images)
          .where(and(eq(images.slug, slug)))
          .limit(1);
        if (!existing[0]) {
          found = true;
        }
      } while (!found);

      const post = await ctx.db
        .insert(images)
        .values({
          title: input.title,
          slug: slug,
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
