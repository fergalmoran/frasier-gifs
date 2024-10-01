DO $$ BEGIN
 CREATE TYPE "public"."post-visibility" AS ENUM('public', 'private', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "visibility" "post-visibility" DEFAULT 'public' NOT NULL;