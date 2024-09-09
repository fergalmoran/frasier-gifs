/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { ImUpload2 } from 'react-icons/im';
interface IImageUploadProps {
  value: string | undefined;
  onChange: (image: File) => void;
}
const ImageUpload: React.FC<IImageUploadProps> = ({ onChange }) => {
  const [image, setImage] = React.useState<string>();
  const onImageChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ImageUpload', 'onImageChange', $event);
    if ($event.target.files) {
      const url = URL.createObjectURL($event.target.files[0]);
      setImage(url);
      onChange($event.target.files[0]);
    }
  };
  return (
    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md border-secondary">
      {image ? (
        <div>
          <div className="relative">
            <img
              src={image}
              alt="Preview"
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-2 m-2 rounded-full "
              onClick={() => setImage('')}
            >
              {''}
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-center">
          <ImUpload2 className="w-8 h-8 mx-auto mb-3 text-base-content/70" />
          <div className="flex text-sm text-base-content">
            <label
              htmlFor="gif-upload"
              className="relative font-medium rounded-md cursor-pointer hover:text-accent badge badge-primary"
            >
              <span>Upload a file</span>
              <input
                accept="image/gif,video/mp4,video/mov,video/quicktime,video/webm,youtube,vimeo"
                id="gif-upload"
                type="file"
                className="sr-only"
                onChange={onImageChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
