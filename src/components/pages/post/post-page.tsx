"use client";
import React from "react";
import { Post } from "@/lib/models/post";
import ActionButton from "@/components/widgets/action-button";
import { Icons } from "@/components/icons";
import PostActions from "./post-actions";

type PostPageProps = {
  post: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div className="flex h-full w-full items-stretch space-x-4">
      <div id="left" className="w-1/6 flex-none">
        <div className="mx-10">
          <PostActions post={post} />
        </div>
      </div>
      <div id="centre" className="flex-grow justify-between">
        <div className="">
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
      <div id="right" className="w-1/6 flex-none">
        Right Stuff
      </div>
    </div>
  );
};

export default PostPage;
