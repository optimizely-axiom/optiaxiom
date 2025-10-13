import type { ComponentPropsWithoutRef } from "react";

import { Button } from "../button";
import { Tooltip } from "../tooltip";
import { useCalendarContext } from "./CalendarContext";
import * as styles from "./CalendarNextMonthButton.css";
import { withYear } from "./utils";

export type CalendarNextMonthButtonProps = ComponentPropsWithoutRef<"button">;

export function CalendarNextMonthButton({
  "aria-label": _ariaLabel,
  children,
  className,
  color: _color,
  onClick,
  ...props
}: CalendarNextMonthButtonProps) {
  const { month, setMonth, view } = useCalendarContext(
    "@optiaxiom/react/CalendarNextMonthButton",
  );
  const label =
    "Go to the " +
    (view === "year"
      ? "next year range"
      : view === "month"
        ? "next year"
        : "next month");

  return (
    <Tooltip content={label}>
      <Button
        appearance="subtle"
        aria-label={label}
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
      />
    </Tooltip>
  );
}

CalendarNextMonthButton.displayName =
  "@optiaxiom/react/CalendarNextMonthButton";
