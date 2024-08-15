import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <PopoverTrigger asChild ref={ref}>
      {asChild ? (
        children
      ) : (
        <Button icon={<IconAngleDown />} iconPosition="end" {...props}>
          {children}
        </Button>
      )}
    </PopoverTrigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
