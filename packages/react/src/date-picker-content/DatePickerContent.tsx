import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import { Calendar } from "../calendar";
import { useDatePickerContext } from "../date-picker-context";
import { Flex } from "../flex";
import { PopoverContent } from "../popover-content";
import * as styles from "./DatePickerContent.css";

type DatePickerContentProps = ComponentPropsWithoutRef<typeof PopoverContent> &
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

export const DatePickerContent = forwardRef<
  HTMLInputElement,
  DatePickerContentProps
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
    const { setValue, step, type, value } =
      useDatePickerContext("DatePickerContent");

    const [height, setHeight] = useState<"lg" | "sm">("sm");

    return (
      <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
        <Flex {...styles.panels({ height })}>
          {addonBefore}
          <Calendar
            alignSelf="start"
            holiday={holiday}
            max={max}
            min={min}
            onHeightChange={(height) => {
              setHeight(height > 300 ? "lg" : "sm");
            }}
            onValueChange={setValue}
            step={step}
            today={today}
            type={type}
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

DatePickerContent.displayName = "@optiaxiom/react/DatePickerContent";
