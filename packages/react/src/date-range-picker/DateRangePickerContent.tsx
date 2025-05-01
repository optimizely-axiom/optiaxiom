import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Calendar } from "../calendar";
import { Flex } from "../flex";
import { PopoverContent } from "../popover";
import * as styles from "./DateRangePickerContent.css";
import { useDateRangePickerContext } from "./DateRangePickerContext";

type DateRangePickerContentProps = ComponentPropsWithoutRef<
  typeof PopoverContent
> &
  Pick<
    ComponentPropsWithoutRef<typeof Calendar>,
    "holiday" | "max" | "min" | "today" | "weekend"
  > & {
    /**
     * Display content inside the popover after the calendar.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the popover before the calendar.
     */
    addonBefore?: ReactNode;
  };

export const DateRangePickerContent = forwardRef<
  HTMLInputElement,
  DateRangePickerContentProps
>(
  (
    {
      addonAfter,
      addonBefore,
      children,
      holiday,
      max,
      min,
      today,
      weekend,
      ...props
    },
    ref,
  ) => {
    const { setOpen, setValue, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerContent",
    );

    return (
      <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
        <Flex {...styles.panels()}>
          {addonBefore}
          <Calendar
            alignSelf="start"
            autoFocus
            holiday={holiday}
            max={max}
            min={min}
            mode="range"
            onValueChange={(value) => {
              setValue(value);
              setOpen(false);
            }}
            today={today}
            value={value}
            weekend={weekend}
          />
          {addonAfter}
        </Flex>
        {children}
      </PopoverContent>
    );
  },
);

DateRangePickerContent.displayName = "@optiaxiom/react/DateRangePickerContent";
