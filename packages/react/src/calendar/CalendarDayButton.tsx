import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { DayButton } from "react-day-picker";

import { Box } from "../box";
import * as styles from "./CalendarDayButton.css";

type CalendarDayButtonProps = ComponentPropsWithoutRef<typeof DayButton>;

export function CalendarDayButton({
  children,
  className,
  color: _color,
  day: _day,
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
          appearance: modifiers.selected
            ? "selected"
            : modifiers.holiday
              ? "holiday"
              : modifiers.weekend
                ? "weekend"
                : "default",
          outside: modifiers.outside,
        },
        className,
      )}
    >
      <button ref={ref} {...props}>
        {children}
        {modifiers.today && <Box {...styles.today()} />}
      </button>
    </Box>
  );
}

CalendarDayButton.displayName = "@optiaxiom/react/CalendarDayButton";
