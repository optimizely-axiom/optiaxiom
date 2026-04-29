"use client";

import { createContext } from "@radix-ui/react-context";

import type { ProteusEventHandler } from "./schemas";

export type UploadFile = (file: File) => Promise<string>;

export type UseResource = (resource: string) => {
  data: undefined | { mimeType: string; text: string };
  isError: boolean;
};

export const [ProteusDocumentProvider, useProteusDocumentContext] =
  createContext<{
    data: Record<string, unknown>;
    onDataChange: (path: string, value: unknown) => void;
    onEvent: (event: ProteusEventHandler) => Promise<unknown>;
    onTrack?: (event: string, properties: Record<string, string>) => void;
    onUpload?: UploadFile;
    readOnly: boolean | undefined;
    strict: boolean | undefined;
    useResource?: UseResource;
    valid: boolean | undefined;
  }>("@optiaxiom/proteus/ProteusDocument");
