import { api } from "@/trpc/server";

type ImageRouteParams = {
  slug: string;
};
const ImageRoute = async ({ params }: { params: ImageRouteParams }) => {
  // const ImageRoute = ({ slug }: ImageRouteParams) => {

  const image = await api.image.getBySlug();
  return <div>Me so imagey {params.slug}</div>;
};

export default ImageRoute;
