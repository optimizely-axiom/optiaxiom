"use client";

import { createContext, type MouseEvent } from "react";

export const DialogKitContext = createContext<
  | undefined
  | {
      id: string;
      onClose: () => void;
      onDismiss?: (
        event:
          | KeyboardEvent
          | MouseEvent<HTMLButtonElement>
          | PointerDownOutsideEvent,
        reason: "action" | "cancel",
      ) => void;
    }
>(undefined);

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
