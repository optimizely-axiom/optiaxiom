"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuNestedProvider, useMenuNestedContext] = createContext<{
  inputRef: RefObject<HTMLInputElement> | undefined;
  level: number;
}>("@optiaxiom/react/MenuNested", { inputRef: undefined, level: 0 });
