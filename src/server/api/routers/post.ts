import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { z } from "zod";
import { posts, votes } from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { type Post } from "@/lib/models/post";

export const postRouter = createTRPCRouter({
  getVoteCount: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const count = await ctx.db
        .execute(sql`SELECT SUM(CASE WHEN up = TRUE THEN 1 ELSE -1 END)
            FROM public.votes v
            WHERE v.post_id = (SELECT id FROM posts WHERE slug = ${input.slug})`);
      return { voteCount: count[0]?.sum ?? "0" };
    }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = (
        await ctx.db
          .select()
          .from(posts)
          .where(and(eq(posts.slug, input.slug)))
          .limit(1)
      )[0];
      if (!post) {
        throw new Error("Image not found");
      }
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        tags: post.tags,
        imageUrl: `/i/${post.filePath}`,
        likes: 0,
        dislikes: 0,
      } as Post;
    }),
  getTrending: publicProcedure.query(async ({ ctx }) => {
    const trending = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return (
      trending.map((t) => {
        return {
          slug: t.slug,
          title: t.title,
          description: t.description,
          tags: t.tags,
          imageUrl: `/i/${t.filePath}`,
          likes: 0,
          dislikes: 0,
        } as Post;
      }) ?? null
    );
  }),
  vote: protectedProcedure
    .input(z.object({ slug: z.string(), up: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug))
        .limit(1)
        .then((results) => results[0]);

      if (!post) {
        throw new Error("Post not found");
      }

      const vote = await ctx.db
        .insert(votes)
        .values({
          postId: post.id,
          createdById: ctx.session.user.id,
          up: input.up,
        })
        .returning()
        .then((results) => results[0]);

      if (!vote) {
        throw new Error("Failed to register vote");
      }

      return {
        success: true,
      };
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
      const slugify = slugifyWithCounter();
      let found = false;
      let slug = "";
      do {
        slug = slugify(input.title);
        const existing = await ctx.db
          .select()
          .from(posts)
          .where(and(eq(posts.slug, slug)))
          .limit(1);
        if (!existing[0]) {
          found = true;
        }
      } while (!found);

      const post = await ctx.db
        .insert(posts)
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
        slug: slug,
      };
    }),
});
