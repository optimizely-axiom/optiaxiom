"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Context } from "radix-ui/internal";

export const [RadioGroupProvider, useRadioGroupContext] = Context.createContext<
  | null
  | (Pick<
      ComponentPropsWithoutRef<"input">,
      "disabled" | "name" | "onBlur" | "onChange"
    > & {
      defaultValue?: string;
      value?: string;
    })
>("@optiaxiom/react/RadioGroup", null);
