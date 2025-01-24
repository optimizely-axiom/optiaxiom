import type { ComponentPropsWithoutRef } from "react";

import { NextMonthButton } from "react-day-picker";

import { Button } from "../button";
import * as styles from "./CalendarNextMonthButton.css";

type CalendarNextMonthButtonProps = ComponentPropsWithoutRef<
  typeof NextMonthButton
>;

export function CalendarNextMonthButton({
  children,
  className,
  color: _color,
  ...props
}: CalendarNextMonthButtonProps) {
  return (
    <Button
      appearance="subtle"
      asChild
      icon={children}
      {...styles.button({}, className)}
      {...props}
    >
      <NextMonthButton />
    </Button>
  );
}

CalendarNextMonthButton.displayName =
  "@optiaxiom/react/CalendarNextMonthButton";
