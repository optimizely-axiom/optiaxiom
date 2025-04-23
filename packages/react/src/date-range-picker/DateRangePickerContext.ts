"use client";

import type { DateRange } from "react-day-picker";

import { Context } from "radix-ui/internal";

export const [DateRangePickerProvider, useDateRangePickerContext] =
  Context.createContext<{
    disabled: boolean | undefined;
    setOpen: (open: boolean) => void;
    setValue: (date: DateRange | null) => void;
    value: DateRange | null;
  }>("@optiaxiom/react/DateRangePicker");
