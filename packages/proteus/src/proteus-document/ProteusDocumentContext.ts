"use client";

import { createContext } from "@radix-ui/react-context";

import type { ProteusEventHandler } from "./schemas";

export type UseResource = (resource: string) => {
  data: { html: string; mimeType: string };
  isLoading: boolean;
};

export const [ProteusDocumentProvider, useProteusDocumentContext] =
  createContext<{
    data: Record<string, unknown>;
    onDataChange: (path: string, value: unknown) => void;
    onEvent: (event: ProteusEventHandler) => Promise<void>;
    readOnly: boolean | undefined;
    strict: boolean | undefined;
    useResource?: UseResource;
    valid: boolean | undefined;
  }>("@optiaxiom/proteus/ProteusDocument");
