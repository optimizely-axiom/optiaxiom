import type { ComponentPropsWithoutRef } from "react";

import { MonthGrid } from "react-day-picker";

import { Box } from "../box";

export type CalendarMonthGridProps = ComponentPropsWithoutRef<typeof MonthGrid>;

export function CalendarMonthGrid({
  children,
  ...props
}: CalendarMonthGridProps) {
  return (
    <Box asChild>
      <MonthGrid {...props}>{children}</MonthGrid>
    </Box>
  );
}

CalendarMonthGrid.displayName = "@optiaxiom/react/CalendarMonthGrid";
