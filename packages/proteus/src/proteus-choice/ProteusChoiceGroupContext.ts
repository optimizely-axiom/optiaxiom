"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ProteusChoiceGroupProvider, useProteusChoiceGroupContext] =
  createContext<
    | null
    | (Pick<
        ComponentPropsWithoutRef<"input">,
        "disabled" | "name" | "onBlur" | "onChange"
      > & {
        defaultValue?: string;
        value?: string;
      })
  >("@optiaxiom/proteus/ProteusChoiceGroup", null);
