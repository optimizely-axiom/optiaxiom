import { forwardRef, useContext } from "react";

import { Button, type ButtonProps } from "../button";
import { ComboboxContext } from "../combobox-context";
import { IconAngleDown } from "../icons/IconAngleDown";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ButtonProps<
  typeof PopoverTrigger,
  {
    title?: string;
  }
>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, title, ...props }, ref) => {
  const context = useContext(ComboboxContext);
  if (!context)
    throw new Error("ComboboxTrigger must be used within a Combobox");

  const { items, value } = context;

  return (
    <PopoverTrigger asChild ref={ref}>
      {asChild ? (
        children
      ) : (
        <Button icon={<IconAngleDown />} iconPosition="end" {...props}>
          {value
            ? items?.find((item) => item.value === value)?.label
            : (title ?? "Select item")}
        </Button>
      )}
    </PopoverTrigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
