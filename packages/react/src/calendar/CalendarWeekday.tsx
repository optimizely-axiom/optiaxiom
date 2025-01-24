import type { ComponentPropsWithoutRef } from "react";

import { Weekday } from "react-day-picker";

import { Box } from "../box";

type CalendarWeekdayProps = ComponentPropsWithoutRef<typeof Weekday>;

export function CalendarWeekday({ children, ...props }: CalendarWeekdayProps) {
  return (
    <Box asChild color="fg.tertiary" fontSize="sm" fontWeight="400">
      <Weekday {...props}>{children}</Weekday>
    </Box>
  );
}

CalendarWeekday.displayName = "@optiaxiom/react/CalendarWeekday";
