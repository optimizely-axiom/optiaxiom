import type { ComponentPropsWithoutRef } from "react";

import { Months } from "react-day-picker";

import { Box } from "../box";
import * as styles from "./CalendarMonths.css";

type CalendarMonthsProps = ComponentPropsWithoutRef<typeof Months>;

export function CalendarMonths({ children, ...props }: CalendarMonthsProps) {
  return (
    <Box asChild {...styles.months()}>
      <Months {...props}>{children}</Months>
    </Box>
  );
}

CalendarMonths.displayName = "@optiaxiom/react/CalendarMonths";
