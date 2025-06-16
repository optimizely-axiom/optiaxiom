import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, useRef } from "react";

import { Popover } from "../popover";
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

  return (
    <Popover onOpenChange={setOpen} open={open} {...props}>
      <DateRangePickerProvider
        disabled={disabled}
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
