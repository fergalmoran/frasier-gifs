"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import Image from "next/image";

export function TrendingImages() {
  const [latestImages] = api.image.getTrending.useSuspenseQuery();

  return (
    <div className="w-full max-w-xs">
      {latestImages ? (
        latestImages.map((image) => (
          // <Image
          //   key={image.id}
          //   src={image.url}
          //   alt={image.title ?? "An image"}
          //   width={320}
          //   height={320}
          // />
          <img src={image.url} />
        ))
      ) : (
        <p>No images yet.</p>
      )}
    </div>
  );
}
