"use client";
import React from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/widgets/image-upload";
import TaggedInput from "@/components/widgets/tagged-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { logger } from "@/lib/logger";
import { api } from "@/trpc/react";
import { STATUS_CODES } from "http";

type FormValues = {
  title: string;
  description: string;
  tags: string[];
  image: string | undefined;
};

const UploadPage: React.FC = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      title: env.NEXT_PUBLIC_DEBUG_MODE ? "This is my title" : "",
      description: env.NEXT_PUBLIC_DEBUG_MODE ? "This is my description" : "",
      tags: [],
      image: undefined,
    },
  });
  const createImage = api.image.create.useMutation({
    onSuccess: async (e) => {
      console.log("upload-page", "onSuccess", e);
      const file = form.getValues().image;
      if (e.id && file) {
        const body = new FormData();
        body.set("image", file);
        const response = await fetch(`/api/upload/profile-image?${e.id}`, {
          method: "POST",
          body,
        });

        await utils.image.invalidate();
        router.replace("/");
      } else {
        //TODO: Probably need to delete the image from the database
        logger.error("upload-page", "onSuccess", "Error uploading image");
      }
    },
  });

  const _submit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      await createImage.mutateAsync(data);
    } catch (error) {
      logger.error("UploadPage", "error", error);
    }
    // if (data.image) {
    //   const body = new FormData();
    //   body.append("file", data.image);
    //   const response = await fetch("api/upload", {
    //     method: "POST",
    //     body,
    //   });
    //   if (response.status === 201) {
    //     router.replace("/");
    //   }
    // }
  };
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-extrabold leading-6">Upload a new gif</h3>
          <p className="text-base-content/70 my-3 text-sm">
            The more info you can give us the better.
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(_submit)}>
            <div className="space-y-4 px-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Let's give your post a title"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="image"
                render={({ field: { value, onChange } }) => (
                  <ImageUpload value={value} onChange={onChange} />
                )}
              />
              <FormField
                control={form.control}
                name="description"
                defaultValue={"fergal.moran+opengifame@gmail.com"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Add a description (if you want?)."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    {form.formState.errors.description && (
                      <FormMessage>
                        {form.formState.errors.description.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <div className="divider pt-4">optional stuff</div>
              <Controller
                control={form.control}
                name="tags"
                render={({ field: { value, onChange } }) => (
                  <TaggedInput label="Tags" value={value} onChange={onChange} />
                )}
              />
            </div>
            <div className="w-full px-4 py-3 text-right">
              <Button type="submit" className="btn btn-primary w-full">
                Upload Gif
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UploadPage;
