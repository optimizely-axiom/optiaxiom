"use client";

import type { Dispatch, RefObject, SetStateAction } from "react";

import { createContext } from "@radix-ui/react-context";

import type { CommandOption } from "../command-context";

export const [MenuProvider, useMenuContext] = createContext<{
  activePath: number[];
  inputRef: RefObject<HTMLInputElement>;
  inputVisible: boolean;
  onSelect: (item: CommandOption, context: { close: boolean }) => void;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setActivePath: Dispatch<SetStateAction<number[]>>;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");
