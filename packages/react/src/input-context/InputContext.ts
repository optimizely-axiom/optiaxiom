import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [InputContextProvider, useInputContext] = createContext<{
  /**
   * When this prop is set to `none` clicking empty space inside the
   * addon will focus the input box.
   */
  addonPointerEvents?: "auto" | "none";
  inputRef: RefObject<HTMLInputElement & HTMLTextAreaElement>;
}>("InputRoot");
