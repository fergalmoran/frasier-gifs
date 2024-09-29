import { Icons } from "@/components/icons";
import React from "react";

const Loading = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2 text-card-foreground"
    >
      <Icons.progress className="h-6 w-6 animate-spin stroke-current" />
      <span className="text-xs font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
