import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useFieldContext } from "../field-context";
import { PopoverContent } from "../popover-content";

type ComboboxContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useFieldContext();

    return (
      <PopoverContent
        aria-labelledby={labelId}
        overflow="hidden"
        p="4"
        ref={ref}
        {...props}
      >
        {children}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
