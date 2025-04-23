import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef } from "react";

import { Popover } from "../popover";
import { DatePickerProvider } from "./DatePickerContext";

type DatePickerProps = ComponentPropsWithRef<typeof Popover> & {
  /**
   * The initial selected value in uncontrolled mode.
   */
  defaultValue?: Date;
  disabled?: boolean;
  /**
   * Handler that is called when the selected value changes.
   */
  onValueChange?: (value: Date | undefined) => void;
  step?: "60" | "300" | "900";
  type?: "date" | "datetime-local";
  /**
   * The selected value in controlled mode.
   */
  value?: Date;
};

export function DatePicker({
  children,
  defaultOpen,
  defaultValue,
  disabled,
  onOpenChange,
  onValueChange,
  open: openProp,
  step,
  type = "date",
  value: valueProp,
  ...props
}: DatePickerProps) {
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
      <DatePickerProvider
        disabled={disabled}
        setOpen={setOpen}
        setValue={setValue}
        step={step as string}
        type={type}
        value={value}
      >
        {children}
      </DatePickerProvider>
    </Popover>
  );
}

DatePicker.displayName = "@optiaxiom/react/DatePicker";
