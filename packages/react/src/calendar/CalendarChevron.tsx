import type { ComponentPropsWithoutRef } from "react";

import { Chevron } from "react-day-picker";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";

export type CalendarChevronProps = ComponentPropsWithoutRef<typeof Chevron>;

export function CalendarChevron({
  orientation,
  ...props
}: CalendarChevronProps) {
  return orientation === "left" ? (
    <IconAngleLeft {...props} />
  ) : (
    <IconAngleRight {...props} />
  );
}

CalendarChevron.displayName = "@optiaxiom/react/CalendarChevron";
