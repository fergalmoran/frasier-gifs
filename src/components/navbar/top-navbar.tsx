"use client";
import Link from "next/link";
import React from "react";

import { type NavItem } from "@/types";
import { type Session } from "next-auth";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

import LoginButton from "@/components/widgets/login/login-button";

type TopNavbarProps = {
  items: NavItem[];
  session: Session | null;
};

const TopNavbar: React.FC<TopNavbarProps> = ({ items, session }) => {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
      <div className="relative flex h-16 justify-between">
        <div className="relative z-10 flex px-2 lg:px-0">
          <div className="flex flex-shrink-0 items-center gap-4">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <Icons.logo className="h-8 w-8" />
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </Link>

            {items?.length ? (
              <nav className="hidden gap-6 md:flex">
                {items?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                      item.href.startsWith(`/${segment}`)
                        ? "text-foreground"
                        : "text-foreground/60",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
          <div className="w-full sm:max-w-xs">
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <button className="relative inline-flex h-8 w-full items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-input bg-muted/50 px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64">
                  <span className="hidden lg:inline-flex">
                    Search images...
                  </span>
                  <span className="inline-flex lg:hidden">Search...</span>
                  <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center lg:hidden">
          Mobile menu
        </div>
        <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <LoginButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
