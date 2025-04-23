import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useRef,
} from "react";

import { Calendar } from "../calendar";
import { Flex } from "../flex";
import { PopoverContent } from "../popover";
import * as styles from "./DatePickerContent.css";
import { useDatePickerContext } from "./DatePickerContext";

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
    const { setOpen, setValue, step, type, value } = useDatePickerContext(
      "@optiaxiom/react/DatePickerContent",
    );

    const panelRef = useRef<HTMLDivElement>(null);

    return (
      <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
        <Flex ref={panelRef} {...styles.panels()}>
          {addonBefore}
          <Calendar
            alignSelf="start"
            holiday={holiday}
            max={max}
            min={min}
            onHeightChange={(height) => {
              if (panelRef.current) {
                panelRef.current.style.height = `${height}px`;
              }
            }}
            onValueChange={(date) => {
              setValue(date);
              if (type === "date") {
                setOpen(false);
              }
            }}
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
