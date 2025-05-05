import type { ComponentPropsWithoutRef } from "react";

import { MonthCaption } from "react-day-picker";

import { Box } from "../box";

export type CalendarMonthCaptionProps = ComponentPropsWithoutRef<
  typeof MonthCaption
>;

export function CalendarMonthCaption({
  children,
  ...props
}: CalendarMonthCaptionProps) {
  return (
    <Box
      alignItems="center"
      asChild
      display="flex"
      fontSize="lg"
      fontWeight="500"
      h="md"
      justifyContent="center"
      mb="16"
    >
      <MonthCaption {...props}>{children}</MonthCaption>
    </Box>
  );
}

CalendarMonthCaption.displayName = "@optiaxiom/react/CalendarMonthCaption";
