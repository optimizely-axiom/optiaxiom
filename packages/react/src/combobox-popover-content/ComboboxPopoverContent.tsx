import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { PopoverContent } from "../popover-content";

type ComboboxPopoverContentProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof PopoverContent>,
  "size"
>;

export const ComboboxPopoverContent = forwardRef<
  HTMLDivElement,
  ComboboxPopoverContentProps
>((props, ref) => {
  return <PopoverContent maxH="sm" minW="trigger" ref={ref} {...props} />;
});

ComboboxPopoverContent.displayName = "@optiaxiom/react/ComboboxPopoverContent";
