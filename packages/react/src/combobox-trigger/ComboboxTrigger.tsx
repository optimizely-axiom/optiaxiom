import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { MenuButton } from "../menu-button";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <PopoverTrigger asChild ref={ref} {...props}>
      {asChild ? children : <MenuButton>{children}</MenuButton>}
    </PopoverTrigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
