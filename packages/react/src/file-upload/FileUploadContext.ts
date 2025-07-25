"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";
import { type DropzoneState } from "react-dropzone";

export const [FileUploadProvider, useFileUploadContext] = createContext<{
  dropzone: DropzoneState;
  rootRef: RefObject<HTMLDivElement>;
}>("@optiaxiom/react/FileUpload");
