"use client";

import type { ComponentType } from "react";

import { createContext } from "@radix-ui/react-context";

import type { ProteusEventHandler } from "./schemas";

export type FileUploadMetadata = {
  link: string;
  name: string;
};

export type ProteusIconMap = Record<
  string,
  ComponentType<{ filled?: boolean }>
>;

export type UploadFile<F extends FileUploadMetadata = FileUploadMetadata> = (
  file: File,
) => Promise<F>;

export type UseResource = (resource: string) => {
  data: undefined | { mimeType: string; text: string };
  isError: boolean;
};

export const [ProteusDocumentProvider, useProteusDocumentContext] =
  createContext<{
    data: Record<string, unknown>;
    icons: ProteusIconMap | undefined;
    onDataChange: (path: string, value: unknown) => void;
    onEvent: (event: ProteusEventHandler) => Promise<unknown>;
    onTrack?: (event: string, properties: Record<string, string>) => void;
    onUpload?: UploadFile;
    readOnly: boolean | undefined;
    strict: boolean | undefined;
    useResource?: UseResource;
    valid: boolean | undefined;
  }>("@optiaxiom/proteus/ProteusDocument");
