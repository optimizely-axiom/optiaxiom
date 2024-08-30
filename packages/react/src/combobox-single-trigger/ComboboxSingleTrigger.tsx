import { forwardRef } from "react";

import type { PopoverTrigger } from "../popover-trigger";

import { Button, type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { IconAngleDown } from "../icons/IconAngleDown";

type ComboboxSingleTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const ComboboxSingleTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxSingleTriggerProps
>(({ title, ...props }, ref) => {
  const { value } = useComboboxContext("Combobox");
  return (
    <Button endDecorator={<IconAngleDown />} ref={ref} {...props}>
      {value || title}
    </Button>
  );
});

ComboboxSingleTrigger.displayName = "@optiaxiom/react/ComboboxSingleTrigger";
