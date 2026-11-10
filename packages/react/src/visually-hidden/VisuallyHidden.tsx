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
        /**
         * Pinned to the containing block's corner: without `top`/`left` the box
         * keeps its in-flow position, which can sit outside a scroll container
         * between it and its containing block and stretch the outer scroll
         * area. Not `fixed`: a transformed ancestor such as `Dialog` becomes
         * its containing block anyway, and it would escape positioned parents
         * such as the toggle root that keep hidden inputs on their control.
         */
        style={{
          left: 0,
          position: "absolute",
          top: 0,
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
