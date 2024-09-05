import { TrendingImages } from "@/app/_components/trending-images";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Warning <span className="text-[hsl(280,100%,70%)]">contains</span>{" "}
            Gifs
          </h1>

          <div>
            <a href="/signin">Sign In</a>
          </div>
          {session?.user && <TrendingImages />}
        </div>
      </main>
    </HydrateClient>
  );
}
