import React from "react";
import { Post } from "@/lib/models/post";

type PostPageProps = {
  post: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div className="grid grid-cols-3">
      <div id="left"></div>
      <div id="centre">
        <div className="flex max-w-lg flex-col justify-center">
          <img
            src={post.imageUrl}
            className="w-full overflow-hidden rounded-lg border shadow"
          />
          <div className="mt-8">
            <h4 className="text-xl font-bold">{post.title}</h4>
            <p className="mt-2 text-gray-600">{post.description}</p>
          </div>
        </div>
      </div>
      <div id="right"></div>
    </div>
  );
};

export default PostPage;
