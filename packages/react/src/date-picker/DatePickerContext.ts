"use client";

import { createContext } from "@radix-ui/react-context";

export const [DatePickerProvider, useDatePickerContext] = createContext<{
  disabled: boolean | undefined;
  setOpen: (open: boolean) => void;
  setValue: (date: Date | undefined) => void;
  step: string;
  type: "date" | "datetime-local";
  value: Date | undefined;
}>("@optiaxiom/react/DatePicker");
