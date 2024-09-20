import React from "react";
import { TrendingPosts } from "@/components/trending-posts";
import { api, HydrateClient } from "@/trpc/server";

const LandingPage: React.FC = async () => {
  void api.post.getTrending.prefetch();

  return (
    <HydrateClient>
      <TrendingPosts />
    </HydrateClient>
  );
};

export default LandingPage;
