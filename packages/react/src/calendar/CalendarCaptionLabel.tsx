import type { ComponentPropsWithoutRef } from "react";

import { IconAngleDown } from "@optiaxiom/icons";
import { CaptionLabel } from "react-day-picker";

import { Button } from "../button";
import { useLocaleContext } from "../locale";
import { formatDate } from "../utils";
import { VisuallyHidden } from "../visually-hidden";
import { useCalendarContext } from "./CalendarContext";
import { withYear } from "./utils";

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
  const { locale } = useLocaleContext("@optiaxiom/react/CalendarCaptionLabel");

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
            {formatDate(locale, month, "yyyy")} -{" "}
            {formatDate(
              locale,
              withYear(month, month.getFullYear() + 11),
              "yyyy",
            )}
          </>
        ) : view === "month" ? (
          formatDate(locale, month, "yyyy")
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
