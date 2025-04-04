import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { Calendar } from "../calendar";
import { toInstant } from "../date-input/utils";
import { useDateRangePickerContext } from "../date-range-picker-context";
import { Flex } from "../flex";
import { PopoverContent } from "../popover-content";
import { usePopoverContext } from "../popover-context";
import { toPlainDate } from "../utils";
import * as styles from "./DateRangePickerContent.css";

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
    const { open } = usePopoverContext(
      "@optiaxiom/react/DateRangePickerContent",
    );
    const { setOpen, setValue, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerContent",
    );

    const [from, setFrom] = useState<Date>();
    useEffect(() => {
      if (!open) {
        setFrom(undefined);
      }
    }, [open]);

    return (
      <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
        <Flex {...styles.panels()}>
          {addonBefore}
          <Calendar
            holiday={holiday}
            max={max}
            min={min}
            mode="range"
            onValueChange={(newValue) => {
              if (!from) {
                const newFrom =
                  value?.from && newValue?.from && newValue.from < value.from
                    ? newValue.from
                    : newValue?.to;
                setFrom(newFrom);
                setValue({
                  from: newFrom,
                  to: newFrom
                    ? toInstant(toPlainDate(newFrom) + "T23:59:59.999")
                    : undefined,
                });
              } else if (newValue?.to) {
                setValue({
                  from: newValue.from,
                  to: toInstant(toPlainDate(newValue.to) + "T23:59:59.999"),
                });
                setOpen(false);
              }
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
