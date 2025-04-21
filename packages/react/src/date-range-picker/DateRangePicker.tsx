import type { DateRange } from "react-day-picker";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef } from "react";

import { Popover } from "../popover";
import { DateRangePickerProvider } from "./DateRangePickerContext";

type DateRangePickerProps = ComponentPropsWithRef<typeof Popover> & {
  /**
   * The initial selected value in uncontrolled mode.
   */
  defaultValue?: DateRange;
  disabled?: boolean;
  /**
   * Handler that is called when the selected value changes.
   */
  onValueChange?: (value: DateRange | undefined) => void;
  /**
   * The selected value in controlled mode.
   */
  value?: DateRange;
};

export function DateRangePicker({
  children,
  defaultOpen,
  defaultValue,
  disabled,
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useControllableState({
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
        value={value}
      >
        {children}
      </DateRangePickerProvider>
    </Popover>
  );
}

DateRangePicker.displayName = "@optiaxiom/react/DateRangePicker";
