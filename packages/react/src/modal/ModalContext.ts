"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ModalProvider, useModalContext] = createContext<{
  shardRef: RefObject<HTMLElement>;
}>("@optiaxiom/react/Modal", { shardRef: { current: null } });
