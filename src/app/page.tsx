import React from "react";
import LandingPage from "@/components/pages/landing-page";
import { TrendingPosts } from "@/components/trending-posts";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  void api.post.getTrending.prefetch();

  return (
    <HydrateClient>
      {session?.user ? <TrendingPosts /> : <LandingPage />}
    </HydrateClient>
  );
}
