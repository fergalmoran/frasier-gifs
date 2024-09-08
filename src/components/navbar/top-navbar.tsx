import { NavItem } from "@/types";
import Link from "next/link";
import React from "react";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site.config";

type TopNavbarProps = {
  items: NavItem[];
};

const TopNavbar: React.FC<TopNavbarProps> = ({ items }) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* <UserAccountNav
      user={{
        name: user.name,
        image: user.image,
        email: user.email,
      }}
    /> */}
      </div>
    </header>
  );
};

export default TopNavbar;
