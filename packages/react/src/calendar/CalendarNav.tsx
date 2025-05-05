import type { ComponentPropsWithoutRef } from "react";

import { Nav } from "react-day-picker";

import { Box } from "../box";
import * as styles from "./CalendarNav.css";

export type CalendarNavProps = ComponentPropsWithoutRef<typeof Nav>;

export function CalendarNav({ children, ...props }: CalendarNavProps) {
  return (
    <Box asChild {...styles.nav()}>
      <Nav {...props}>{children}</Nav>
    </Box>
  );
}

CalendarNav.displayName = "@optiaxiom/react/CalendarNav";
