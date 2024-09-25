import { api } from "@/trpc/server";
import BlurIn from "./magicui/blur-in";
import Link from "next/link";
import { Icons } from "./icons";
import { Post } from "@/lib/models/post";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import VoteCount from "./widgets/vote-count";

export const TrendingPosts: React.FC = async () => {
  const trendingPosts = await api.post.getTrending();
  return trendingPosts.length !== 0 ? (
    <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
      {trendingPosts.map((post: Post) => (
        <div className="py-2">
          <Link href={`/post/${post.slug}`} key={post.slug}>
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-auto w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm">{post.title}</CardTitle>
                <p className="mt-2 line-clamp-1 text-xs text-muted-foreground lg:line-clamp-2">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between px-1 text-xs">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Icons.up className="h-2 w-2" />
                  </Button>
                  <VoteCount post={post} />
                  <Button variant="ghost" size="sm">
                    <Icons.down className="h-2 w-2" />
                  </Button>
                </div>
                <span className="font-semibold"></span>
              </CardFooter>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <BlurIn
      word="No images yet"
      className="scroll-m-20 text-3xl font-bold tracking-tight"
    />
  );
};
