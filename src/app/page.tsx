import { TrendingImages } from "@/app/_components/trending-images";
import LandingPage from "@/components/pages/landing-page";
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
