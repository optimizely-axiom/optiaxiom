import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { MonthGrid } from "react-day-picker";

import { Box } from "../box";
import { useLocaleContext } from "../locale";
import { formatDate } from "../utils";
import { useCalendarContext } from "./CalendarContext";
import { CalendarGrid } from "./CalendarGrid";
import { withMonth, withYear } from "./utils";

export type CalendarMonthGridProps = ComponentPropsWithoutRef<typeof MonthGrid>;

export function CalendarMonthGrid({
  children,
  ...props
}: CalendarMonthGridProps) {
  const { month, setMonth, setView, view } = useCalendarContext(
    "@optiaxiom/react/CalendarMonthGrid",
  );
  const { locale } = useLocaleContext("@optiaxiom/react/CalendarMonthGrid");

  const months = Array.from({ length: 12 }, (_, month) => {
    const date = new Date(2000, month, 1);
    return [
      formatDate(locale, date, "LLL"),
      formatDate(locale, date, "LLLL"),
    ] as const;
  });

  const ref = useRef<HTMLDivElement>(null);
  const lastMonthRef = useRef<Date>();
  const lastViewRef = useRef<string>();
  useEffect(() => {
    if (view !== "day") {
      lastMonthRef.current = undefined;
      lastViewRef.current = view;
      return;
    }

    if (lastMonthRef.current) {
      ref.current?.querySelector("tbody")?.animate(
        [
          {
            opacity: 0,
            translate: month > lastMonthRef.current ? "20px" : "-20px",
          },
          {
            opacity: 1,
            translate: "0px",
          },
        ],
        {
          duration: 150,
        },
      );
    } else if (lastViewRef.current) {
      ref.current?.animate(
        [
          {
            opacity: 0,
            scale: 1.03,
          },
          {
            opacity: 1,
            scale: 1,
          },
        ],
        {
          duration: 150,
        },
      );
      const days = Array.from(
        ref.current?.querySelectorAll<HTMLButtonElement>(
          "tbody button:not([disabled])",
        ) ?? [],
      );
      const focusedDay =
        days.find(
          (day) => day.textContent === formatDate(locale, month, "d"),
        ) ?? days[0];
      focusedDay?.focus();
    }
    lastMonthRef.current = month;
    lastViewRef.current = view;
  }, [locale, month, view]);

  if (view === "year") {
    return (
      <CalendarGrid
        onPageChange={(dir) => {
          setMonth(withYear(month, month.getFullYear() + dir * 12));
        }}
        onValueChange={(value) => {
          setMonth(withYear(month, month.getFullYear() + value));
          setView("month");
        }}
        options={Array.from({ length: 12 }).map((_, index) => {
          const year = formatDate(
            locale,
            withYear(month, month.getFullYear() + index),
            "yyyy",
          );
          return [year, year] as const;
        })}
        value={0}
      />
    );
  } else if (view === "month") {
    return (
      <CalendarGrid
        onPageChange={(dir) => {
          setMonth(withYear(month, month.getFullYear() + dir));
        }}
        onValueChange={(value) => {
          setMonth(withMonth(month, value));
          setView("day");
        }}
        options={months}
        value={month.getMonth()}
      />
    );
  } else {
    return (
      <Box ref={ref}>
        <Box asChild>
          <MonthGrid {...props}>{children}</MonthGrid>
        </Box>
      </Box>
    );
  }
}

CalendarMonthGrid.displayName = "@optiaxiom/react/CalendarMonthGrid";
