import React from "react";
import { Post } from "@/lib/models/post";

type ImagePageProps = {
  post: Post;
};

const ImagePage: React.FC<ImagePageProps> = ({ post }) => {
  return <div>{post.title}</div>;
};

export default ImagePage;
