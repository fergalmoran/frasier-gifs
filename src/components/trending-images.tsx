import { api } from "@/trpc/server";
import BlurIn from "./magicui/blur-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "./icons";
import ActionButton from "./widgets/action-button";

const upvote = async () => {
  "use server";
  console.log("trending-images", "upvote");
};
const downvote = async () => {
  "use server";
  console.log("trending-images", "downvote");
};

export const TrendingImages: React.FC = async () => {
  const latestImages = await api.post.getTrending();
  return latestImages.length !== 0 ? (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {latestImages.map((image) => (
        <Link href={`/image/${image.slug}`} key={image.slug}>
          <div className="break-inside rounded-lg">
            <div className="relative m-6 flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-lg hover:bg-accent">
              <div className="relative flex items-center justify-center px-2 pt-4">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={image.imageUrl}
                  alt={image.description ?? "An image"}
                />
              </div>
              <div className="relative mt-6 space-y-2 px-6">
                <span className="text-md block font-semibold">
                  {image.title}
                </span>
                <div className="flex justify-between pb-2">
                  <div className="pr-2">
                    <div className="line-clamp-1 align-middle text-sm opacity-75">
                      {image.description}
                    </div>
                  </div>
                  <span className="block items-center rounded-full text-xs font-bold leading-none">
                    <div className="flex space-x-1">
                      <ActionButton
                        title="Upvote"
                        action={upvote}
                        icon={<Icons.up />}
                      />
                      <ActionButton
                        title="Downvote"
                        action={downvote}
                        icon={<Icons.down />}
                      />
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <BlurIn
      word="No images yet"
      className="scroll-m-20 text-3xl font-bold tracking-tight"
    />
  );
};
