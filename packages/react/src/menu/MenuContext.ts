"use client";

import type {
  ComponentPropsWithoutRef,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

import { createContext } from "@radix-ui/react-context";

import type { Command } from "../command";
import type { CommandOption } from "../command/internals";

export const [MenuProvider, useMenuContext] = createContext<{
  activeItemStack: Array<CommandOption[]>;
  inputRef: RefObject<HTMLInputElement>;
  inputVisible: boolean;
  onSelect: NonNullable<ComponentPropsWithoutRef<typeof Command>["onSelect"]>;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setActiveItemStack: Dispatch<SetStateAction<Array<CommandOption[]>>>;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");
