import LandingPage from "@/components/pages/landing-page";
import { TrendingImages } from "@/components/trending-images";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      {session?.user ? <TrendingImages /> : <LandingPage />}
    </HydrateClient>
  );
}
