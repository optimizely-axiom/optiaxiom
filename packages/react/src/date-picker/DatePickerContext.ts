"use client";

import { createContext } from "@radix-ui/react-context";

export const [DatePickerProvider, useDatePickerContext] = createContext<{
  disabled: boolean | undefined;
  setOpen: (open: boolean) => void;
  setValue: (date: Date | null) => void;
  step: string;
  type: "date" | "datetime-local";
  value: Date | null;
}>("@optiaxiom/react/DatePicker");
