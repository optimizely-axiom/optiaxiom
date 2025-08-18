"use client";

import { createContext } from "react";

export const DialogKitContext = createContext<
  | undefined
  | {
      id: string;
      onClose: () => void;
    }
>(undefined);
