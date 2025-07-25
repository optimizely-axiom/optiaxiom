"use client";

import { createContext } from "@radix-ui/react-context";
import { type DropzoneState } from "react-dropzone";

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  dropzone: DropzoneState;
}>("@optiaxiom/react/FileUpload");
