import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, useEffect, useRef, useState } from "react";

import { useEffectEvent } from "../hooks";
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
   */
  onValueChange?: (value: DateRange | null) => void;
  /**
   * The selected value in controlled mode.
   */
  value?: DateRange | null;
};

type DateRange = { from: Date; to: Date };

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
  const setValueStable = useEffectEvent(setValue);

  useEffect(() => {
    if (open) {
      setFrom(undefined);
    }
  }, [open]);
  useEffect(() => {
    if (!open && from) {
      const end = toInstant(toPlainDate(from) + "T23:59:59.999");
      if (end) {
        setValueStable({ from: from, to: end });
      }
    }
  }, [from, open, setValueStable]);

  return (
    <Popover onOpenChange={setOpen} open={open} {...props}>
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
