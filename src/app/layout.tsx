import { Inknut_Antiqua as font } from "next/font/google";
import "@/styles/globals.css";

import { type Metadata, type Viewport } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import TopNavbar from "@/components/navbar/top-navbar";
import { dashboardConfig } from "@/config/top-nav.config";
import { siteConfig } from "@/config/site.config";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ClipboardListener } from "@/components/clipboard-listener";
import {
  ClipboardContext,
  ClipboardProvider,
} from "@/lib/clipboard/clipboard-context";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
const f = font({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Open Gifame",
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Open Gifame</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          f.className,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClipboardProvider>
              <ClipboardListener />
              <Toaster />
              <TailwindIndicator />

              <TopNavbar items={dashboardConfig.mainNav} session={session} />
              <main className="m-4">{children}</main>
            </ClipboardProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
