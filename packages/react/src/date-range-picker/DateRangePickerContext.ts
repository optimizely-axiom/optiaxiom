"use client";

import type { DateRange } from "react-day-picker";

import { createContext } from "@radix-ui/react-context";

export const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<{
    disabled: boolean | undefined;
    setOpen: (open: boolean) => void;
    setValue: (date: DateRange | undefined) => void;
    value: DateRange | undefined;
  }>("@optiaxiom/react/DateRangePicker");
