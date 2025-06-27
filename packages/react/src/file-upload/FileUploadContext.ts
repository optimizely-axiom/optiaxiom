"use client";

import { createContext } from "@radix-ui/react-context";
import {
  type DropzoneInputProps,
  type DropzoneRootProps,
} from "react-dropzone";

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragAccept: boolean;
  isDragReject: boolean;
}>("@optiaxiom/react/FileUpload");
