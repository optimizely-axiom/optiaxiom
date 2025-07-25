"use client";

import type { Dispatch, RefObject, SetStateAction } from "react";

import { createContext } from "@radix-ui/react-context";

type DateRange = { from: Date; to: Date };

export const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<{
    disabled: boolean | undefined;
    setFrom: Dispatch<SetStateAction<Date | undefined>>;
    setOpen: (open: boolean) => void;
    setValue: (date: DateRange | null) => void;
    triggerRef: RefObject<HTMLButtonElement>;
    value: DateRange | null;
  }>("@optiaxiom/react/DateRangePicker");
