"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { CommandOption } from "../command/internals";

export const [MenuProvider, useMenuContext] = createContext<{
  inputRef: RefObject<HTMLInputElement>;
  inputVisible: boolean;
  onSelect: (item: CommandOption, context: { close: boolean }) => void;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");
