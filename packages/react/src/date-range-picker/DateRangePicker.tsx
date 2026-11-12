import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, useEffect, useRef, useState } from "react";

import { useEvent } from "../hooks";
import { Popover } from "../popover";
import { toInstant, toPlainDate } from "../utils";
import { DateRangePickerProvider } from "./DateRangePickerContext";

export type DateRangePickerProps = ComponentPropsWithRef<typeof Popover> & {
  /**
   * The initial selected value in uncontrolled mode.
   */
  defaultValue?: DateRange | null;
  /**
   * Whether the date range picker is disabled.
   */
  disabled?: boolean;
  /**
   * Handler that is called when the selected value changes.
   *
   * `from` is midnight on the first day and `to` is `23:59:59.999` on the last
   * day, both in the user's local time zone, so in UTC either can fall on a
   * different day.
   */
  onValueChange?: (value: DateRange | null) => void;
  /**
   * The selected value in controlled mode.
   */
  value?: DateRange | null;
};

type DateRange = {
  /**
   * Midnight on the first day, in the user's local time zone.
   */
  from: Date;
  /**
   * `23:59:59.999` on the last day, in the user's local time zone.
   */
  to: Date;
};

/**
 * Calendar popover that lets user pick date ranges.
 *
 * @category date
 * @group DateRangePicker
 * @since 1.4.0
 * @extends Popover
 */
export function DateRangePicker({
  children,
  defaultOpen = false,
  defaultValue = null,
  disabled,
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
  ...props
}: DateRangePickerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [from, setFrom] = useState<Date>();
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/DateRangePicker",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useControllableState({
    caller: "@optiaxiom/react/DateRangePicker",
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });
  const setOpenStable = useEvent(setOpen);
  const setValueStable = useEvent(setValue);

  useEffect(() => {
    if (disabled) {
      setFrom(undefined);
      setOpenStable(false);
    } else if (open) {
      setFrom(undefined);
    }
  }, [disabled, open, setOpenStable]);
  useEffect(() => {
    if (!disabled && !open && from) {
      const end = toInstant(toPlainDate(from) + "T23:59:59.999");
      if (end) {
        setValueStable({ from: from, to: end });
      }
    }
  }, [disabled, from, open, setValueStable]);

  return (
    <Popover onOpenChange={setOpen} open={open && !disabled} {...props}>
      <DateRangePickerProvider
        disabled={disabled}
        setFrom={setFrom}
        setOpen={setOpen}
        setValue={setValue}
        triggerRef={triggerRef}
        value={value}
      >
        {children}
      </DateRangePickerProvider>
    </Popover>
  );
}

DateRangePicker.displayName = "@optiaxiom/react/DateRangePicker";
