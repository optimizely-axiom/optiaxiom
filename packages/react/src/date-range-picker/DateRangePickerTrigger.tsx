import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Box } from "../box";
import { useFieldLabelTrigger } from "../hooks";
import { IconCalendar } from "../icons/IconCalendar";
import { PopoverTrigger } from "../popover";
import { useDateRangePickerContext } from "./DateRangePickerContext";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export type DateRangePickerTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverTrigger
> & {
  /**
   * Provide a custom date range formatter.
   */
  formatRange?: Intl.DateTimeFormat["formatRange"];
  /**
   * The placeholder when there is no value.
   */
  placeholder?: string;
};

export const DateRangePickerTrigger = forwardRef<
  HTMLButtonElement,
  DateRangePickerTriggerProps
>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      children,
      formatRange,
      placeholder = "Pick a date",
      ...props
    },
    outerRef,
  ) => {
    const { disabled, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerTrigger",
    );
    const formatter = formatRange ? { formatRange } : dateFormatter;

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
            formatter.formatRange(value.from, value.to)
          ) : (
            <Box color="fg.tertiary">{placeholder}</Box>
          ))}
      </PopoverTrigger>
    );
  },
);

DateRangePickerTrigger.displayName = "@optiaxiom/react/DateRangePickerTrigger";
