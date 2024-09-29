import React from "react";
import LandingPage from "@/components/pages/landing-page";
import { TrendingPosts } from "@/components/trending-posts";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return <LandingPage />;
}
