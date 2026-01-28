"use client";

import { createContext } from "@radix-ui/react-context";

export const [BlockDocumentProvider, useBlockDocumentContext] = createContext<{
  data: Record<string, string>;
  onCancelAction: ((prompt: string) => void) | undefined;
  onDataChange: (name: string, value: string) => void;
  onEvent: (
    event:
      | {
          action: "setVisibility";
          params: Record<string, boolean>;
          when?: string;
        }
      | {
          tool: string;
        },
    value?: string,
  ) => void;
  readOnly: boolean | undefined;
  visibility: Record<string, boolean>;
}>("@optiaxiom/react/BlockDocument");
