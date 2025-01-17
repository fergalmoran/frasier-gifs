/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Icons } from "../icons";
interface IImageUploadProps {
  value: string | undefined;
  pastedImage: File | undefined;
  onChange: (image: File) => void;
}
const ImageUpload: React.FC<IImageUploadProps> = ({
  pastedImage,
  onChange,
}) => {
  const [image, setImage] = React.useState<string | undefined>(
    pastedImage && URL.createObjectURL(pastedImage),
  );

  const onImageChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    if ($event.target.files?.[0]) {
      handleNewImage($event.target.files[0]);
    }
  };

  const handleNewImage = (imageFile: File) => {
    const url = URL.createObjectURL(imageFile);
    setImage(url);
    onChange(imageFile);
  };

  React.useEffect(() => {
    if (pastedImage) {
      handleNewImage(pastedImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-secondary px-6 pb-6 pt-5">
      {image ? (
        <div>
          <div className="relative">
            <img src={image} alt="Preview" />
            <button
              type="button"
              className="absolute right-0 top-0 m-2 rounded-full p-2"
              onClick={() => setImage("")}
            >
              <Icons.close className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-center">
          <Icons.upload className="text-base-content/70 mx-auto mb-3 h-8 w-8" />
          <div className="text-base-content flex text-sm">
            <label
              htmlFor="gif-upload"
              className="badge badge-primary relative cursor-pointer rounded-md font-medium hover:text-accent"
            >
              <span>Upload a file</span>
              <input
                accept="image/gif,image/jpg,image/jpeg,image/png,video/mp4,video/mov,video/quicktime,video/webm,youtube,vimeo"
                id="gif-upload"
                type="file"
                className="sr-only"
                onChange={onImageChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
