import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { PopoverContent } from "../popover-content";

type ComboboxContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <PopoverContent overflow="hidden" p="4" ref={ref} {...props}>
        {children}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
