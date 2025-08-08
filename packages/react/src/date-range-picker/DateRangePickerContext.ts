"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

type DateRange = { from: Date; to: Date };

export const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<{
    disabled: boolean | undefined;
    innerValue: DateRange | null;
    setInnerValue: (date: DateRange | null) => void;
    setOpen: (open: boolean) => void;
    setValue: (date: DateRange | null) => void;
    triggerRef: RefObject<HTMLButtonElement>;
    value: DateRange | null;
  }>("@optiaxiom/react/DateRangePicker");
