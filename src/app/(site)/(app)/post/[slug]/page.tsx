import PostPage from "@/components/pages/post/post-page";
import { api } from "@/trpc/server";

type PostRouteParams = {
  slug: string;
};
const PostRoute = async ({ params }: { params: PostRouteParams }) => {
  const post = await api.post.getBySlug({ slug: params.slug });
  return <PostPage post={post} />;
};

export default PostRoute;
