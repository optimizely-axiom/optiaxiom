import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { MonthGrid } from "react-day-picker";

import { Box } from "../box";
import { useCalendarContext } from "./CalendarContext";
import { CalendarGrid } from "./CalendarGrid";
import { withMonth, withYear } from "./utils";

export type CalendarMonthGridProps = ComponentPropsWithoutRef<typeof MonthGrid>;

const months = [
  ["Jan", "January"] as const,
  ["Feb", "February"] as const,
  ["Mar", "March"] as const,
  ["Apr", "April"] as const,
  ["May", "May"] as const,
  ["Jun", "June"] as const,
  ["Jul", "July"] as const,
  ["Aug", "August"] as const,
  ["Sep", "September"] as const,
  ["Oct", "October"] as const,
  ["Nov", "November"] as const,
  ["Dec", "December"] as const,
];

export function CalendarMonthGrid({
  children,
  ...props
}: CalendarMonthGridProps) {
  const { month, setMonth, setView, view } = useCalendarContext(
    "@optiaxiom/react/CalendarMonthGrid",
  );

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
        days.find((day) => day.textContent === `${month.getDate()}`) ?? days[0];
      focusedDay?.focus();
    }
    lastMonthRef.current = month;
    lastViewRef.current = view;
  }, [month, view]);

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
        options={Array.from({ length: 12 }).map(
          (_, index) => month.getFullYear() + index,
        )}
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
