"use client";

import type { DateRange } from "react-day-picker";

import { createContext } from "@radix-ui/react-context";

export const [DateRangePickerContextProvider, useDateRangePickerContext] =
  createContext<{
    disabled: boolean | undefined;
    setValue: (date: DateRange | undefined) => void;
    value: DateRange | undefined;
  }>("DateRangePicker");
