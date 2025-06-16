import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { DayButton } from "react-day-picker";

import { Box } from "../box";
import * as styles from "./CalendarDayButton.css";

export type CalendarDayButtonProps = ComponentPropsWithoutRef<typeof DayButton>;

export function CalendarDayButton({
  children,
  className,
  color: _color,
  day: _day,
  disabled,
  modifiers,
  ...props
}: CalendarDayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Box
      asChild
      {...styles.button(
        {
          appearance: modifiers.range_middle
            ? "range_middle"
            : modifiers.selected
              ? "selected"
              : modifiers.holiday
                ? "holiday"
                : modifiers.weekend
                  ? "weekend"
                  : "default",
          range:
            modifiers.outside || (modifiers.range_start && modifiers.range_end)
              ? undefined
              : modifiers.range_start
                ? "start"
                : modifiers.range_middle
                  ? "middle"
                  : modifiers.range_end
                    ? "end"
                    : undefined,
        },
        className,
      )}
    >
      <button disabled={modifiers.outside || disabled} ref={ref} {...props}>
        {children}
        {modifiers.today && <Box {...styles.today()} />}
      </button>
    </Box>
  );
}

CalendarDayButton.displayName = "@optiaxiom/react/CalendarDayButton";
