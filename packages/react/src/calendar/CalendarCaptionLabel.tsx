import type { ComponentPropsWithoutRef } from "react";

import { CaptionLabel } from "react-day-picker";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { VisuallyHidden } from "../visually-hidden";
import { useCalendarContext } from "./CalendarContext";

export type CalendarCaptionLabelProps = ComponentPropsWithoutRef<
  typeof CaptionLabel
>;

export function CalendarCaptionLabel({
  children,
  ...props
}: CalendarCaptionLabelProps) {
  const { month, setView, view } = useCalendarContext(
    "@optiaxiom/react/CalendarCaptionLabel",
  );

  return (
    <Button
      appearance="subtle"
      icon={<IconAngleDown />}
      iconPosition="end"
      onClick={() => {
        if (view === "month") {
          setView("year");
        } else {
          setView("month");
        }
      }}
    >
      <CaptionLabel {...props}>
        {view === "year" ? (
          <>
            {month.getFullYear()} - {month.getFullYear() + 11}
          </>
        ) : view === "month" ? (
          month.getFullYear()
        ) : (
          children
        )}
      </CaptionLabel>
      <VisuallyHidden>
        {view === "month" ? "change year" : "change month"}
      </VisuallyHidden>
    </Button>
  );
}

CalendarCaptionLabel.displayName = "@optiaxiom/react/CalendarCaptionLabel";
