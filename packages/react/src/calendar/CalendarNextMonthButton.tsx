import type { ComponentPropsWithoutRef } from "react";

import { NextMonthButton } from "react-day-picker";

import { Button } from "../button";
import { useCalendarContext } from "./CalendarContext";
import * as styles from "./CalendarNextMonthButton.css";
import { withYear } from "./utils";

export type CalendarNextMonthButtonProps = ComponentPropsWithoutRef<
  typeof NextMonthButton
>;

export function CalendarNextMonthButton({
  "aria-label": ariaLabel,
  children,
  className,
  color: _color,
  onClick,
  ...props
}: CalendarNextMonthButtonProps) {
  const { month, setMonth, view } = useCalendarContext(
    "@optiaxiom/react/CalendarNextMonthButton",
  );

  return (
    <Button
      appearance="subtle"
      aria-label={
        view === "year"
          ? "Go to next year range"
          : view === "month"
            ? "Go to next year"
            : ariaLabel
      }
      asChild
      icon={children}
      onClick={(event) => {
        if (view === "day") {
          onClick?.(event);
        } else {
          setMonth(
            withYear(month, month.getFullYear() + (view === "year" ? 12 : 1)),
          );
        }
      }}
      {...styles.button({}, className)}
      {...props}
    >
      <NextMonthButton />
    </Button>
  );
}

CalendarNextMonthButton.displayName =
  "@optiaxiom/react/CalendarNextMonthButton";
