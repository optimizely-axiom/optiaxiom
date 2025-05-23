import { createSlot, type SlotProps } from "@radix-ui/react-slot";
import { forwardRef } from "react";

const Slot = createSlot("@optiaxiom/react/FilteredSlot");

export type FilteredSlotProps = SlotProps & {
  /**
   * Exclude props from being forwarded by Slot.
   */
  exclude?: string;
};

export const FilteredSlot = forwardRef<HTMLElement, FilteredSlotProps>(
  ({ exclude, ...props }, ref) => {
    if (exclude) {
      delete props[exclude as keyof typeof props];
    }
    return <Slot ref={ref} {...props} />;
  },
);

FilteredSlot.displayName = "@optiaxiom/react/FilteredSlot";
