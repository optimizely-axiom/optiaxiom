"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export type RemoteFile = {
  name: string;
  type: string;
  url: string;
};

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  accept: string;
  disabled: boolean | undefined;
  inputRef: RefObject<HTMLInputElement>;
  onFilesDrop: ((files: Array<File | RemoteFile>) => void) | undefined;
  rootRef: RefObject<HTMLDivElement>;
}>("@optiaxiom/react/FileUpload");
