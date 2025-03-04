import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Calendar } from "../calendar";
import { useDateRangePickerContext } from "../date-range-picker-context";
import { PopoverContent } from "../popover-content";
import * as styles from "./DateRangePickerContent.css";

type DateRangePickerContentProps = ComponentPropsWithoutRef<
  typeof PopoverContent
> &
  Pick<ComponentPropsWithoutRef<typeof Calendar>, "holiday" | "weekend">;

export const DateRangePickerContent = forwardRef<
  HTMLInputElement,
  DateRangePickerContentProps
>(({ children, className, holiday, weekend, ...props }, ref) => {
  const { setValue, value } = useDateRangePickerContext(
    "DateRangePickerContent",
  );

  return (
    <PopoverContent ref={ref} {...styles.content({}, className)} {...props}>
      <Calendar
        holiday={holiday}
        mode="range"
        onValueChange={setValue}
        value={value}
        weekend={weekend}
      />
      {children}
    </PopoverContent>
  );
});

DateRangePickerContent.displayName = "@optiaxiom/react/DateRangePickerContent";
