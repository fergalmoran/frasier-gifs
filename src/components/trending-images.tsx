import { BellIcon } from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { api } from "@/trpc/server";

const createGridCard = (
  key: string,
  url: string,
  title: string,
  description: string,
  tags: string[],
) => {
  const value = {
    Icon: BellIcon,
    name: title,
    description: description,
    href: "/",
    cta: "Learn more",
    background: <img className="h-128 absolute w-full" src={url} />,
    className: "col-span-1 row-start-1 row-end-4",
  };

  return <BentoCard key={key} {...value} />;
};

export async function TrendingImages() {
  const latestImages = await api.image.getTrending();
  return (
    <BentoGrid className="lg:grid-rows-3">
      {latestImages.map((image) =>
        createGridCard(
          image.id,
          image.url,
          image.title ?? "",
          image.description ?? "",
          image.tags ?? [],
        ),
      )}
    </BentoGrid>
  );
}
