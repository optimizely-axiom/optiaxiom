import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Calendar } from "../calendar";
import { useFieldContext } from "../field/internals";
import { Flex } from "../flex";
import { PopoverContent } from "../popover";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./DateRangePickerContent.css";
import { useDateRangePickerContext } from "./DateRangePickerContext";

export type DateRangePickerContentProps = ComponentPropsWithoutRef<
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
      "aria-label": ariaLabel,
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
    const { labelId: fieldLabelId } = useFieldContext(
      "@optiaxiom/react/DateRangePickerContent",
    );
    const { setOpen, setValue, triggerRef, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerContent",
    );
    const labelId = useId();

    return (
      <PopoverContent
        aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
        gap="8"
        maxW={undefined}
        ref={ref}
        {...props}
      >
        <VisuallyHidden id={labelId}>{ariaLabel || "Calendar"}</VisuallyHidden>
        <Flex {...styles.panels()}>
          {addonBefore}
          <Calendar
            alignSelf="start"
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
