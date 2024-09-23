import { api } from "@/trpc/server";
import BlurIn from "./magicui/blur-in";
import Link from "next/link";
import { Icons } from "./icons";
import ActionButton from "./widgets/action-button";
import { Post } from "@/lib/models/post";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const upvote = async () => {
  "use server";
  console.log("trending-posts", "upvote");
};
const downvote = async () => {
  "use server";
  console.log("trending-posts", "downvote");
};

export const TrendingPosts: React.FC = async () => {
  const trendingPosts = await api.post.getTrending();
  return trendingPosts.length !== 0 ? (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {trendingPosts.map((post: Post) => (
        <div className="p-4">
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
                <CardTitle>{post.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Icons.up className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icons.down className="h-4 w-4" />
                  </Button>
                </div>
                <span className="font-semibold">{post.likes} votes</span>
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
