import type { ComponentPropsWithoutRef } from "react";

import { Months } from "react-day-picker";

import { Group } from "../group";
import * as styles from "./CalendarMonths.css";

export type CalendarMonthsProps = ComponentPropsWithoutRef<typeof Months>;

export function CalendarMonths({ children, ...props }: CalendarMonthsProps) {
  return (
    <Group asChild {...styles.months()}>
      <Months {...props}>{children}</Months>
    </Group>
  );
}

CalendarMonths.displayName = "@optiaxiom/react/CalendarMonths";
