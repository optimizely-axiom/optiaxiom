"use client";

import type { ComponentPropsWithoutRef, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { Command } from "../command";

export const [MenuProvider, useMenuContext] = createContext<{
  inputRef: RefObject<HTMLInputElement>;
  inputVisible: boolean;
  onSelect: NonNullable<ComponentPropsWithoutRef<typeof Command>["onSelect"]>;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");
