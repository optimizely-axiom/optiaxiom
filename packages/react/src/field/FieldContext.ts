"use client";

import { createContext } from "@radix-ui/react-context";

export const [FieldProvider, useFieldContext] = createContext<{
  descriptionId: string | undefined;
  error: boolean;
  errorId: string | undefined;
  inputId: string | undefined;
  labelId: string | undefined;
}>("@optiaxiom/react/Field", {
  descriptionId: undefined,
  error: false,
  errorId: undefined,
  inputId: undefined,
  labelId: undefined,
});
