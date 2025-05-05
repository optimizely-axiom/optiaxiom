import type { ComponentPropsWithoutRef } from "react";

import { Weekdays } from "react-day-picker";

import { Box } from "../box";

export type CalendarWeekdaysProps = ComponentPropsWithoutRef<typeof Weekdays>;

export function CalendarWeekdays({
  children,
  ...props
}: CalendarWeekdaysProps) {
  return (
    <Box asChild display="flex" flexDirection="column" mb="6">
      <thead aria-hidden="true">
        <Box asChild display="flex" gap="2">
          <tr {...props}>{children}</tr>
        </Box>
      </thead>
    </Box>
  );
}

CalendarWeekdays.displayName = "@optiaxiom/react/CalendarWeekdays";
