"use client";

import { createContext } from "@radix-ui/react-context";

export const [CalendarProvider, useCalendarContext] = createContext<{
  month: Date;
  setMonth: (month: Date) => void;
  setTo: (date: Date | undefined) => void;
  setView: (view: "day" | "month" | "year") => void;
  view: "day" | "month" | "year";
}>("@optiaxiom/react/Calendar");
