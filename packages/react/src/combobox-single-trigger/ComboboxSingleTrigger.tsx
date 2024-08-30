import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { ComboboxTrigger } from "../combobox-trigger";
import { IconAngleDown } from "../icons/IconAngleDown";

type ComboboxSingleTriggerProps = ButtonProps<typeof ComboboxTrigger>;

export const ComboboxSingleTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxSingleTriggerProps
>(({ title, ...props }, ref) => {
  const { value } = useComboboxContext("Combobox");
  return (
    <ComboboxTrigger asChild ref={ref} {...props}>
      <Button>
        {value || title}
        <IconAngleDown />
      </Button>
    </ComboboxTrigger>
  );
});

ComboboxSingleTrigger.displayName = "@optiaxiom/react/ComboboxSingleTrigger";