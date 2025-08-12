import type { ComponentPropsWithoutRef } from "react";

import { PreviousMonthButton } from "react-day-picker";

import { Button } from "../button";
import { useCalendarContext } from "./CalendarContext";
import * as styles from "./CalendarPreviousMonthButton.css";
import { withYear } from "./utils";

export type CalendarPreviousMonthButtonProps = ComponentPropsWithoutRef<
  typeof PreviousMonthButton
>;

export function CalendarPreviousMonthButton({
  "aria-label": ariaLabel,
  children,
  className,
  color: _color,
  onClick,
  ...props
}: CalendarPreviousMonthButtonProps) {
  const { month, setMonth, view } = useCalendarContext(
    "@optiaxiom/react/CalendarPreviousMonthButton",
  );

  return (
    <Button
      appearance="subtle"
      aria-label={
        view === "year"
          ? "Go to previous year range"
          : view === "month"
            ? "Go to previous year"
            : ariaLabel
      }
      asChild
      icon={children}
      onClick={(event) => {
        if (view === "day") {
          onClick?.(event);
        } else {
          setMonth(
            withYear(month, month.getFullYear() - (view === "year" ? 12 : 1)),
          );
        }
      }}
      {...styles.button({}, className)}
      {...props}
    >
      <PreviousMonthButton />
    </Button>
  );
}

CalendarPreviousMonthButton.displayName =
  "@optiaxiom/react/CalendarPreviousMonthButton";
