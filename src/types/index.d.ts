export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
export type DashboardConfig = {
  mainNav: NavItem[];
};
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};