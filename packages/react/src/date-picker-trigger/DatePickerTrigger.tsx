import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Box } from "../box";
import { useDatePickerContext } from "../date-picker-context";
import { IconCalendar } from "../icons/IconCalendar";
import { PopoverTrigger } from "../popover-trigger";
import { useFieldLabelTrigger } from "../use-field-label-trigger";

type DatePickerTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverTrigger
> & {
  format?: (date: Date) => string;
  placeholder?: string;
};

const DEFAULT_FORMATTER = (date: Date) =>
  date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const DatePickerTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerTriggerProps
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
    const { disabled, value } = useDatePickerContext("DatePickerTrigger");

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

DatePickerTrigger.displayName = "@optiaxiom/react/DatePickerTrigger";
