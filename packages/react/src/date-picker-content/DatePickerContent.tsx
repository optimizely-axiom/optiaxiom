import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Calendar } from "../calendar";
import { useDatePickerContext } from "../date-picker-context";
import { Flex } from "../flex";
import { PopoverContent } from "../popover-content";
import * as styles from "./DatePickerContent.css";

type DatePickerContentProps = ComponentPropsWithoutRef<typeof PopoverContent> &
  Pick<ComponentPropsWithoutRef<typeof Calendar>, "holiday" | "weekend"> & {
    /**
     * Display content inside the popover after the calendar.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the popover before the calendar.
     */
    addonBefore?: ReactNode;
  };

export const DatePickerContent = forwardRef<
  HTMLInputElement,
  DatePickerContentProps
>(({ addonAfter, addonBefore, children, holiday, weekend, ...props }, ref) => {
  const { setValue, value } = useDatePickerContext("DatePickerContent");

  return (
    <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
      <Flex {...styles.panels()}>
        {addonBefore}
        <Calendar
          holiday={holiday}
          onValueChange={setValue}
          value={value}
          weekend={weekend}
        />
        {addonAfter}
      </Flex>
      {children}
    </PopoverContent>
  );
});

DatePickerContent.displayName = "@optiaxiom/react/DatePickerContent";
