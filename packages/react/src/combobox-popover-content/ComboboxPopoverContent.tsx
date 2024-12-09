import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { PopoverContent } from "../popover-content";

type ComboboxPopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverContent
>;

export const ComboboxPopoverContent = forwardRef<
  HTMLDivElement,
  ComboboxPopoverContentProps
>((props, ref) => {
  return <PopoverContent minW="trigger" ref={ref} {...props} />;
});

ComboboxPopoverContent.displayName = "@optiaxiom/react/ComboboxPopoverContent";
