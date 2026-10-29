import type { ComponentPropsWithoutRef } from "react";

import { IconChevronLeft } from "@optiaxiom/icons/IconChevronLeft";
import { IconChevronRight } from "@optiaxiom/icons/IconChevronRight";
import { Chevron } from "react-day-picker";

export type CalendarChevronProps = ComponentPropsWithoutRef<typeof Chevron>;

export function CalendarChevron({
  orientation,
  ...props
}: CalendarChevronProps) {
  return orientation === "left" ? (
    <IconChevronLeft {...props} />
  ) : (
    <IconChevronRight {...props} />
  );
}

CalendarChevron.displayName = "@optiaxiom/react/CalendarChevron";
