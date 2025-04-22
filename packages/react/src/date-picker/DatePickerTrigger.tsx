import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Box } from "../box";
import { useFieldLabelTrigger } from "../hooks";
import { IconCalendar } from "../icons/IconCalendar";
import { PopoverTrigger } from "../popover";
import { useDatePickerContext } from "./DatePickerContext";

type DatePickerTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverTrigger
> & {
  format?: (date: Date) => string;
  placeholder?: string;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
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
      format,
      placeholder = "Pick a date",
      ...props
    },
    outerRef,
  ) => {
    const { disabled, type, value } = useDatePickerContext(
      "@optiaxiom/react/DatePickerTrigger",
    );
    const formatter = format
      ? { format }
      : type === "datetime-local"
        ? dateTimeFormatter
        : dateFormatter;

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
            formatter.format(value)
          ) : (
            <Box color="fg.tertiary">{placeholder}</Box>
          ))}
      </PopoverTrigger>
    );
  },
);

DatePickerTrigger.displayName = "@optiaxiom/react/DatePickerTrigger";
