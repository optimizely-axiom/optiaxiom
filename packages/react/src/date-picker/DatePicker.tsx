import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef } from "react";

import { DatePickerContextProvider } from "../date-picker-context";
import { Popover } from "../popover";

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
      <DatePickerContextProvider
        disabled={disabled}
        setValue={setValue}
        value={value}
      >
        {children}
      </DatePickerContextProvider>
    </Popover>
  );
}

DatePicker.displayName = "@optiaxiom/react/DatePicker";
