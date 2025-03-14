"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

export const [RadioGroupProvider, useRadioGroupContext] = createContext<
  | null
  | (Pick<
      ComponentPropsWithoutRef<"input">,
      "disabled" | "name" | "onBlur" | "onChange"
    > & {
      defaultValue?: string;
      value?: string;
    })
>("@optiaxiom/react/RadioGroup", null);
