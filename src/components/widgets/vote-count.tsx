"use client";
import { type Post } from "@/lib/models/post";
import { api } from "@/trpc/react";
import React from "react";
import { Icons } from "@/components/icons";

type VoteCountProps = {
  post: Post;
};

const VoteCount: React.FC<VoteCountProps> = ({ post }) => {
  const voteCount = api.post.getVoteCount.useQuery({ slug: post.slug });

  return (
    <span>
      {voteCount.data ? (
        // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
        `${voteCount.data.voteCount} votes`
      ) : (
        <Icons.spinner className="animate-spin" />
      )}
    </span>
  );
};

export default VoteCount;
