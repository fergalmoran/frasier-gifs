import React from "react";
import { Post } from "@/lib/models/post";

type PostPageProps = {
  post: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return <div>{post.title}</div>;
};

export default PostPage;
