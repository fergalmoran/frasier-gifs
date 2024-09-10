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

type FormValues = {
  title: string;
  description: string;
  tags: string[];
  image: string | undefined;
};

const UploadPage: React.FC = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      image: undefined,
    },
  });
  const _submit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (data.image) {
      const body = new FormData();
      body.append("title", data.title);
      body.append("description", data.description);
      body.append("tags", data.tags.join("|"));
      body.append("file", data.image);
      const response = await fetch("api/upload", {
        method: "POST",
        body,
      });
      if (response.status === 201) {
        await router.replace("/");
      }
    }
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
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-4 px-4">
                <FormField
                  control={form.control}
                  name="title"
                  defaultValue={"fergal.moran+opengifame@gmail.com"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      {form.formState.errors.title && (
                        <FormMessage>
                          {form.formState.errors.title.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  defaultValue={"fergal.moran+opengifame@gmail.com"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      {form.formState.errors.description && (
                        <FormMessage>
                          {form.formState.errors.description.message}
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
                <div className="divider pt-4">optional stuff</div>
                <Controller
                  control={form.control}
                  name="tags"
                  render={({ field: { value, onChange } }) => (
                    <TaggedInput
                      label="Tags"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="w-full px-4 py-3 text-right">
                <button type="submit" className="btn btn-primary w-full">
                  Upload Gif
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UploadPage;
