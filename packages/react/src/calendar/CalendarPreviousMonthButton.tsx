import type { ComponentPropsWithoutRef } from "react";

import { Button } from "../button";
import { Tooltip } from "../tooltip";
import { useCalendarContext } from "./CalendarContext";
import * as styles from "./CalendarPreviousMonthButton.css";
import { withYear } from "./utils";

export type CalendarPreviousMonthButtonProps =
  ComponentPropsWithoutRef<"button">;

export function CalendarPreviousMonthButton({
  "aria-label": _ariaLabel,
  children,
  className,
  color: _color,
  onClick,
  ...props
}: CalendarPreviousMonthButtonProps) {
  const { month, setMonth, view } = useCalendarContext(
    "@optiaxiom/react/CalendarPreviousMonthButton",
  );
  const label =
    "Go to the " +
    (view === "year"
      ? "previous year range"
      : view === "month"
        ? "previous year"
        : "previous month");

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
              withYear(month, month.getFullYear() - (view === "year" ? 12 : 1)),
            );
          }
        }}
        {...styles.button({}, className)}
        {...props}
      />
    </Tooltip>
  );
}

CalendarPreviousMonthButton.displayName =
  "@optiaxiom/react/CalendarPreviousMonthButton";
