import { Post } from "@/lib/models/post";
import React from "react";
import ActionButton from "@/components/widgets/action-button";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";

type PostActionsProps = {
  post: Post;
};

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const vote = api.post.vote.useMutation();
  const voteCount = api.post.getVoteCount.useQuery({ slug: post.slug });
  return (
    <div className="flex flex-col items-center space-y-4 border p-4 shadow-lg">
      <ActionButton
        title="Upvote"
        action={async () => {
          await vote.mutateAsync({ slug: post.slug, up: true });
          voteCount.refetch();
        }}
        icon={<Icons.up className="h-8 w-8" />}
      />
      <div>{voteCount.data ? voteCount.data.toString() : "Loading..."}</div>
      <ActionButton
        title="Downvote"
        action={async () => {
          await vote.mutateAsync({ slug: post.slug, up: false });
          voteCount.refetch();
        }}
        icon={<Icons.down className="h-8 w-8" />}
      />
      <ActionButton
        title="Favourite"
        action={async () => {
          await vote.mutateAsync({ slug: post.slug, up: false });
          voteCount.refetch();
        }}
        icon={<Icons.heart className="h-8 w-8" />}
      />
    </div>
  );
};

export default PostActions;
