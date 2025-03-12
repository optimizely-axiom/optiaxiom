"use client";

import { createContext } from "@radix-ui/react-context";

export const [DatePickerContextProvider, useDatePickerContext] = createContext<{
  disabled: boolean | undefined;
  setValue: (date: Date | undefined) => void;
  step: string;
  type: "date" | "datetime-local";
  value: Date | undefined;
}>("DatePicker");
