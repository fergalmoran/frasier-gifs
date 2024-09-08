import { env } from "@/env";
import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: env.NEXT_PUBLIC_SITE_OG_IMAGE,
  links: {
    twitter: env.NEXT_PUBLIC_SITE_TWITTER,
    github: env.NEXT_PUBLIC_SITE_GITHUB,
  },
};
