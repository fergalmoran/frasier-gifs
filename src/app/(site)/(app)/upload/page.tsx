"use client";
import * as React from "react";

import UploadPage from "@/components/pages/upload-page";
import { ClipboardContext } from "@/lib/clipboard/clipboard-context";
import { usePathname, useSearchParams } from "next/navigation";
import GenericError from "@/components/errors/generic-error";

const Upload = () => {
  const path = useSearchParams();
  const clipboardContext = React.useContext(ClipboardContext);
  const c = path.get("c") || "";
  const [file, setFile] = React.useState<File | undefined>(undefined);
  if (c === "1" && clipboardContext?.file) {
    setFile(file);
  }
  return c === "1" && !file ? (
    <div>
      <GenericError
        code={500}
        title="Ooopsies"
        text="Unable to find any image data, please try again."
      />
    </div>
  ) : (
    <div className="mt-4">
      <UploadPage file={file} />
    </div>
  );
};

export default Upload;
