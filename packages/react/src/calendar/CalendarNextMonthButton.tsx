import type { ComponentPropsWithoutRef } from "react";

import { NextMonthButton } from "react-day-picker";

import { Button } from "../button";

export type CalendarNextMonthButtonProps = ComponentPropsWithoutRef<
  typeof NextMonthButton
>;

export function CalendarNextMonthButton({
  children,
  color: _color,
  ...props
}: CalendarNextMonthButtonProps) {
  return (
    <Button appearance="subtle" asChild icon={children} {...props}>
      <NextMonthButton />
    </Button>
  );
}

CalendarNextMonthButton.displayName =
  "@optiaxiom/react/CalendarNextMonthButton";
