import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

export const [RadioGroupContextProvider, useRadioGroupContext] = createContext<
  | ({
      defaultValue?: string;
      value?: string;
    } & Pick<
      ComponentPropsWithoutRef<"input">,
      "disabled" | "name" | "onBlur" | "onChange"
    >)
  | null
>("RadioGroup", null);
