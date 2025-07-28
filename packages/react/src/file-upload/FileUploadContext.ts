"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  accept: string;
  disabled: boolean | undefined;
  inputRef: RefObject<HTMLInputElement>;
  onFilesDrop: ((files: Array<Blob | File>) => void) | undefined;
  rootRef: RefObject<HTMLDivElement>;
}>("@optiaxiom/react/FileUpload");
