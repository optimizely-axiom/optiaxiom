"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ModalContextProvider, useModalContext] = createContext<{
  shardRef: RefObject<HTMLElement>;
}>("Modal", { shardRef: { current: null } });
