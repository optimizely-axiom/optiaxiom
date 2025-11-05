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
  ({ asChild, children, disabled, style, ...props }, ref) => {
    return (
      <RadixVisuallyHidden.Root
        asChild
        ref={ref}
        style={{
          position: "fixed",
          ...style,
        }}
        {...props}
      >
        <FilteredSlot exclude={disabled ? "style" : undefined}>
          {asChild ? children : <span>{children}</span>}
        </FilteredSlot>
      </RadixVisuallyHidden.Root>
    );
  },
);

VisuallyHidden.displayName = "@optiaxiom/react/VisuallyHidden";
