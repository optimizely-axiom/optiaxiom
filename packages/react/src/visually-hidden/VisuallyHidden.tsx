import * as RadixVisuallyHidden from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { FilteredSlot } from "../filtered-slot";

export type VisuallyHiddenProps = ComponentPropsWithoutRef<
  typeof RadixVisuallyHidden.Root
> & {
  /**
   * Set to true to hide the content.
   */
  disabled?: boolean;
};

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, disabled, ...props }, ref) => {
    return (
      <RadixVisuallyHidden.Root asChild ref={ref} {...props}>
        <FilteredSlot exclude={disabled ? "style" : undefined}>
          <span>{children}</span>
        </FilteredSlot>
      </RadixVisuallyHidden.Root>
    );
  },
);

VisuallyHidden.displayName = "@optiaxiom/react/VisuallyHidden";
