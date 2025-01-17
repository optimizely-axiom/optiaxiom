"use client";

import { createContext, type RefObject } from "react";

export const TransitionGroupContext = createContext<
  | undefined
  | {
      onMount: (ref: RefObject<HTMLElement>) => void;
      onUnmount: (ref: RefObject<HTMLElement>) => void;
      open: boolean | undefined;
    }
>(undefined);
