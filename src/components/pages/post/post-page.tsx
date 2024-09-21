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
      <div id="centre" className="flex-grow">
        <div>
          <div className="flex flex-col">
            <div className="flex justify-center p-4">
              <img src={post.imageUrl} className="object-cover" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-xl font-bold">{post.title}</h4>
          <p className="mt-2 text-gray-600">{post.description}</p>
        </div>
      </div>
      <div id="right" className="w-1/6 flex-none">
        Right Stuff
      </div>
    </div>
  );
};

export default PostPage;
