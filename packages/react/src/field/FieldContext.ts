"use client";

import { createContext } from "@radix-ui/react-context";

export const [FieldProvider, useFieldContext] = createContext<{
  countId: string | undefined;
  descriptionId: string | undefined;
  error: boolean;
  errorId: string | undefined;
  inputId: string | undefined;
  labelId: string | undefined;
  onCountChange:
    | ((count: undefined | { length: number; maxLength: number }) => void)
    | undefined;
}>("@optiaxiom/react/Field", {
  countId: undefined,
  descriptionId: undefined,
  error: false,
  errorId: undefined,
  inputId: undefined,
  labelId: undefined,
  onCountChange: undefined,
});
