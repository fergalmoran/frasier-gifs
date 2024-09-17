import { useParams } from "next/navigation";
import React from "react";

const ImagePage = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default ImagePage;
