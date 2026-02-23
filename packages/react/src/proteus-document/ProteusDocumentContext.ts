"use client";

import { createContext } from "@radix-ui/react-context";

export const [ProteusDocumentProvider, useProteusDocumentContext] =
  createContext<{
    data: Record<string, string>;
    onCancelAction: ((prompt: string) => void) | undefined;
    onDataChange: (name: string, value: string) => void;
    onEvent: (event: { message: string } | { tool: string }) => void;
    readOnly: boolean | undefined;
  }>("@optiaxiom/react/ProteusDocument");
