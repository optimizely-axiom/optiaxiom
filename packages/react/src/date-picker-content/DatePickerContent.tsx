import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Calendar } from "../calendar";
import { useDatePickerContext } from "../date-picker-context";
import { PopoverContent } from "../popover-content";
import * as styles from "./DatePickerContent.css";

type DatePickerContentProps = ComponentPropsWithoutRef<typeof PopoverContent> &
  Pick<ComponentPropsWithoutRef<typeof Calendar>, "holiday" | "weekend">;

export const DatePickerContent = forwardRef<
  HTMLInputElement,
  DatePickerContentProps
>(({ children, className, holiday, weekend, ...props }, ref) => {
  const { setValue, value } = useDatePickerContext("DatePickerContent");

  return (
    <PopoverContent ref={ref} {...styles.content({}, className)} {...props}>
      <Calendar
        holiday={holiday}
        onValueChange={setValue}
        value={value}
        weekend={weekend}
      />
      {children}
    </PopoverContent>
  );
});

DatePickerContent.displayName = "@optiaxiom/react/DatePickerContent";
