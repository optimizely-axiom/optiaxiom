"use client";

import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

export const [ModalProvider, useModalContext] = Context.createContext<{
  shardRef: RefObject<HTMLElement>;
}>("@optiaxiom/react/Modal", { shardRef: { current: null } });
