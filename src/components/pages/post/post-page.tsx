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
        <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
        <div className="rounded-t-md border-l border-r border-t bg-card text-card-foreground shadow">
          <div className="flex flex-col">
            <div className="flex justify-center p-4">
              <img
                src={post.imageUrl}
                className="h-auto max-w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="rounded-b-md border-b border-l border-r bg-muted">
          <p className="p-4 text-sm opacity-75">{post.description}</p>
        </div>
      </div>
      <div id="right" className="w-1/6 flex-none">
        Right Stuff
      </div>
    </div>
  );
};

export default PostPage;
