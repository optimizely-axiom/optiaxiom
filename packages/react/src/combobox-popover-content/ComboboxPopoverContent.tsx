import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ComboboxContent } from "../combobox-content";

import { PopoverContent } from "../popover-content";

type ComboboxPopoverContentProps = ComponentPropsWithoutRef<
  typeof ComboboxContent
>;

export const ComboboxPopoverContent = forwardRef<
  HTMLDivElement,
  ComboboxPopoverContentProps
>((props, ref) => {
  return <PopoverContent maxH="sm" minW="trigger" ref={ref} {...props} />;
});

ComboboxPopoverContent.displayName = "@optiaxiom/react/ComboboxPopoverContent";
