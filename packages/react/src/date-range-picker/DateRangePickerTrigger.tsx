import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

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
    const { disabled, triggerRef, value } = useDateRangePickerContext(
      "@optiaxiom/react/DateRangePickerTrigger",
    );

    const id = useId();
    const ref = useComposedRefs(outerRef, triggerRef);
    const labelId = useFieldLabelTrigger(triggerRef, ariaLabelledBy);

    const formatter = formatRange ? { formatRange } : dateFormatter;

    return (
      <PopoverTrigger
        aria-labelledby={labelId}
        disabled={disabled}
        icon={<IconCalendar />}
        id={id}
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
