import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    UPLOAD_PATH: z.string().default("uploads"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),

    NEXT_PUBLIC_DEBUG_MODE: z.boolean(),
    NEXT_PUBLIC_SITE_NAME: z.string().default("My Site"),
    NEXT_PUBLIC_SITE_DESCRIPTION: z.string().default("My site description"),
    NEXT_PUBLIC_SITE_URL: z.string().default("https://opengifame.com"),
    NEXT_PUBLIC_SITE_OG_IMAGE: z
      .string()
      .default("https://example.com/og-image.jpg"),
    NEXT_PUBLIC_SITE_TWITTER: z.string().default(""),
    NEXT_PUBLIC_SITE_GITHUB: z.string().default(""),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    UPLOAD_PATH: process.env.UPLOAD_PATH,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_DEBUG_MODE:
      process.env.NEXT_PUBLIC_DEBUG_MODE === "1" ? true : false,
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_OG_IMAGE: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_TWITTER: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_GITHUB: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
