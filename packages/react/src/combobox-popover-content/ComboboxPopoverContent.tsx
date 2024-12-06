import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { PopoverContent } from "../popover-content";
import { RemoveScroll } from "../remove-scroll";

type ComboboxPopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverContent
>;

export const ComboboxPopoverContent = forwardRef<
  HTMLDivElement,
  ComboboxPopoverContentProps
>((props, ref) => {
  return (
    <RemoveScroll>
      <PopoverContent minW="trigger" ref={ref} {...props} />
    </RemoveScroll>
  );
});

ComboboxPopoverContent.displayName = "@optiaxiom/react/ComboboxPopoverContent";
