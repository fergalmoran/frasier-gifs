"use client";
import * as React from "react";

type ClipboardContextType = {
  file: File | null | undefined;
};

const ClipboardContext = React.createContext<ClipboardContextType>({
  file: null,
});

const ClipboardProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClipboardContext.Provider value={{ file: null }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export { ClipboardContext, ClipboardProvider };
