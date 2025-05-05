import type { ComponentPropsWithoutRef } from "react";

import { PreviousMonthButton } from "react-day-picker";

import { Button } from "../button";

export type CalendarPreviousMonthButtonProps = ComponentPropsWithoutRef<
  typeof PreviousMonthButton
>;

export function CalendarPreviousMonthButton({
  children,
  color: _color,
  ...props
}: CalendarPreviousMonthButtonProps) {
  return (
    <Button appearance="subtle" asChild icon={children} {...props}>
      <PreviousMonthButton />
    </Button>
  );
}

CalendarPreviousMonthButton.displayName =
  "@optiaxiom/react/CalendarPreviousMonthButton";
