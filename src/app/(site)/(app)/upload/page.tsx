"use client";
import * as React from "react";

import UploadPage from "@/components/pages/upload-page";
import { ClipboardContext } from "@/lib/clipboard/clipboard-context";
import { usePathname, useSearchParams } from "next/navigation";
import GenericError from "@/components/errors/generic-error";
import Loading from "@/components/widgets/loading";

const Upload = () => {
  const clipboardContext = React.useContext(ClipboardContext);
  const [loading, setLoading] = React.useState(true);
  const path = useSearchParams();
  const c = path.get("c") || "";

  React.useEffect(() => {
    console.log("page", "c", c);
    console.log("page", "f", clipboardContext?.file);
    if (c === "1" && clipboardContext?.file) {
      setLoading(false);
      console.log("page", "set-file", clipboardContext?.file);
    } else {
      if (c === "1") {
        setLoading(false);
      }
    }
  }, [c, clipboardContext?.file]);

  const renderPage = () => {
    if (
      (c === "1" && clipboardContext?.file != null && !loading) ||
      c !== "1"
    ) {
      return clipboardContext?.file ? (
        <UploadPage file={clipboardContext?.file} />
      ) : null;
    }
    if (c === "1" && loading) {
      return <Loading />;
    }
    return (
      <GenericError
        code={500}
        title="Ooopsies"
        text="Unable to find any image data, please try again."
      />
    );
  };
  return renderPage();
};

export default Upload;
