import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { DayButton } from "react-day-picker";

import { Button } from "../button";
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
    <Button
      appearance={modifiers.selected ? "primary" : "subtle"}
      data-state={modifiers.today ? "active" : undefined}
      ref={ref}
      square
      {...styles.button({ outside: modifiers.outside }, className)}
      {...props}
    >
      {children}
    </Button>
  );
}

CalendarDayButton.displayName = "@optiaxiom/react/CalendarDayButton";
