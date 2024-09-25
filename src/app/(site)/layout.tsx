"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { clipboardImageToFile } from "@/lib/image";
import { logger } from "@/lib/logger";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}
