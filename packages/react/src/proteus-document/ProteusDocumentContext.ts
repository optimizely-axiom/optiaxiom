"use client";

import { createContext } from "@radix-ui/react-context";

export const [ProteusDocumentProvider, useProteusDocumentContext] =
  createContext<{
    data: Record<string, unknown>;
    onDataChange: (path: string, value: unknown) => void;
    onEvent: (event: { message: string } | { tool: string }) => void;
    readOnly: boolean | undefined;
  }>("@optiaxiom/react/ProteusDocument");
