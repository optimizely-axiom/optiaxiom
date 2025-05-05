"use client";

import { createContext } from "@radix-ui/react-context";

type DateRange = { from: Date; to: Date };

export const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<{
    disabled: boolean | undefined;
    setOpen: (open: boolean) => void;
    setValue: (date: DateRange | null) => void;
    value: DateRange | null;
  }>("@optiaxiom/react/DateRangePicker");
