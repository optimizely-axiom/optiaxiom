import type { ComponentPropsWithoutRef } from "react";

import { Months } from "react-day-picker";

import { Flex } from "../flex";
import * as styles from "./CalendarMonths.css";

export type CalendarMonthsProps = ComponentPropsWithoutRef<typeof Months>;

export function CalendarMonths({ children, ...props }: CalendarMonthsProps) {
  return (
    <Flex asChild {...styles.months()}>
      <Months {...props}>{children}</Months>
    </Flex>
  );
}

CalendarMonths.displayName = "@optiaxiom/react/CalendarMonths";
