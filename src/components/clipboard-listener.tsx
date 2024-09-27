"use client";
import * as React from "react";

import { clipboardImageToFile } from "@/lib/clipboard/converters";
import { logger } from "@/lib/logger";
import { redirect, useRouter } from "next/navigation";
import { ClipboardContext } from "@/lib/clipboard/clipboard-context";

export const ClipboardListener = () => {
  const clipboardContext = React.useContext(ClipboardContext);
  const router = useRouter();
  React.useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      logger.log("clipboard-listener", "Received clipboard data");
      if (event.clipboardData && event.clipboardData.items.length >= 0) {
        logger.log("clipboard-listener", "Received contains items");
        clipboardImageToFile(event.clipboardData, (file) => {
          clipboardContext.file = file;
          router.push("/upload?c=1");
        });
      }
    };
    logger.log("clipboard-listener", "Adding clipboard event listener");
    window.addEventListener("paste", handlePaste);

    return () => {
      logger.log("clipboard-listener", "Removing clipboard listener");
      window.removeEventListener("paste", handlePaste);
    };
  });
  return <></>;
};
