import type { DateRange } from "react-day-picker";

import { useComposedRefs } from "radix-ui/internal";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Box } from "../box";
import { useFieldLabelTrigger } from "../hooks";
import { IconCalendar } from "../icons/IconCalendar";
import { PopoverTrigger } from "../popover";
import { useDateRangePickerContext } from "./DateRangePickerContext";

type DateRangePickerTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverTrigger
> & {
  format?: (date: DateRange) => string;
  placeholder?: string;
};

const DEFAULT_FORMATTER = (date: DateRange) =>
  date.from && date.to
    ? date.from.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      " - " +
      date.to.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

export const DateRangePickerTrigger = forwardRef<
  HTMLButtonElement,
  DateRangePickerTriggerProps
>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      children,
      format = DEFAULT_FORMATTER,
      placeholder = "Pick a date",
      ...props
    },
    outerRef,
  ) => {
    const { disabled, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerTrigger",
    );

    const buttonRef = useRef<HTMLButtonElement>(null);
    const ref = useComposedRefs(outerRef, buttonRef);

    const labelId = useFieldLabelTrigger(buttonRef, ariaLabelledBy);

    return (
      <PopoverTrigger
        aria-labelledby={labelId}
        disabled={disabled}
        icon={<IconCalendar />}
        ref={ref}
        {...props}
      >
        {children ??
          (value ? (
            format(value)
          ) : (
            <Box color="fg.tertiary">{placeholder}</Box>
          ))}
      </PopoverTrigger>
    );
  },
);

DateRangePickerTrigger.displayName = "@optiaxiom/react/DateRangePickerTrigger";
