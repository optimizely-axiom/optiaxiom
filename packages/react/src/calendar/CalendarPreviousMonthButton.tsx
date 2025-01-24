import type { ComponentPropsWithoutRef } from "react";

import { PreviousMonthButton } from "react-day-picker";

import { Button } from "../button";
import * as styles from "./CalendarPreviousMonthButton.css";

type CalendarPreviousMonthButtonProps = ComponentPropsWithoutRef<
  typeof PreviousMonthButton
>;

export function CalendarPreviousMonthButton({
  children,
  className,
  color: _color,
  ...props
}: CalendarPreviousMonthButtonProps) {
  return (
    <Button
      appearance="subtle"
      asChild
      icon={children}
      {...styles.button({}, className)}
      {...props}
    >
      <PreviousMonthButton />
    </Button>
  );
}

CalendarPreviousMonthButton.displayName =
  "@optiaxiom/react/CalendarPreviousMonthButton";
