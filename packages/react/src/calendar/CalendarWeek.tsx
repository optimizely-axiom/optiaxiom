import type { ComponentPropsWithoutRef } from "react";

import { Week } from "react-day-picker";

import { Box } from "../box";

export type CalendarWeekProps = ComponentPropsWithoutRef<typeof Week>;

export function CalendarWeek({ children, ...props }: CalendarWeekProps) {
  return (
    <Box asChild display="flex" gap="2" mt="2">
      <Week {...props}>{children}</Week>
    </Box>
  );
}

CalendarWeek.displayName = "@optiaxiom/react/CalendarWeek";
