"use client";

import { createContext } from "@radix-ui/react-context";

export const [CalendarProvider, useCalendarContext] = createContext<{
  setTo: (date: Date | undefined) => void;
}>("@optiaxiom/react/Calendar");
