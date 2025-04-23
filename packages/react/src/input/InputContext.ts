"use client";

import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

export const [InputProvider, useInputContext] = Context.createContext<{
  /**
   * When this prop is set to `none` clicking empty space inside the
   * addon will focus the input box.
   */
  addonPointerEvents?: "auto" | "none";
  inputRef: RefObject<HTMLInputElement & HTMLTextAreaElement>;
}>("@optiaxiom/react/Input");
