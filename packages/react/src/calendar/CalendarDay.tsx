import type { ComponentPropsWithoutRef } from "react";

import { Day } from "react-day-picker";

import { Box } from "../box";

export type CalendarDayProps = ComponentPropsWithoutRef<typeof Day>;

export function CalendarDay({ children, ...props }: CalendarDayProps) {
  return (
    <Box asChild flex="1">
      <Day {...props}>{children}</Day>
    </Box>
  );
}

CalendarDay.displayName = "@optiaxiom/react/CalendarDay";
