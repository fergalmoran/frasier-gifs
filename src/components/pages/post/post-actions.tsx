import { Post } from "@/lib/models/post";
import React from "react";
import ActionButton from "@/components/widgets/action-button";
import { Icons } from "@/components/icons";

type PostActionsProps = {
  post: Post;
};

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  return (
    <div className="flex flex-col items-center space-y-4 border p-4 shadow-lg">
      <ActionButton
        title="Upvote"
        action={() => {}}
        icon={<Icons.up className="h-8 w-8" />}
      />
      <div>{post.likes}</div>
      <ActionButton
        title="Downvote"
        action={() => {}}
        icon={<Icons.down className="h-8 w-8" />}
      />
      <ActionButton
        title="Favourite"
        action={() => {}}
        icon={<Icons.heart className="h-8 w-8" />}
      />
    </div>
  );
};

export default PostActions;
