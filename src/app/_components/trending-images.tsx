"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function TrendingImages() {
  const [name, setName] = useState("");
  return <div className="w-full max-w-xs">Trending Images</div>;
}
