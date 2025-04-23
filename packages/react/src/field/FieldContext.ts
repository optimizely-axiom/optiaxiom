"use client";

import { Context } from "radix-ui/internal";

export const [FieldProvider, useFieldContext] = Context.createContext<{
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
