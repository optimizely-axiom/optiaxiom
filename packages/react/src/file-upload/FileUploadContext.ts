"use client";

import { createContext } from "@radix-ui/react-context";
import {
  type DropzoneInputProps,
  type DropzoneRootProps,
} from "react-dropzone";

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  files: File[];
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragAccept: boolean;
  isDragReject: boolean;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  view: "grid" | "list";
}>("@optiaxiom/react/FileUpload");
