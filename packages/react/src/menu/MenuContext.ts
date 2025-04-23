"use client";

import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

import type { CommandOption } from "../command/internals";

export const [MenuProvider, useMenuContext] = Context.createContext<{
  inputRef: RefObject<HTMLInputElement>;
  inputVisible: boolean;
  onSelect: (item: CommandOption, context: { close: boolean }) => void;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");
