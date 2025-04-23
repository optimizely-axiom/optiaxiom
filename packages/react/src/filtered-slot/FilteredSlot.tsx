import { Slot as RadixSlot } from "radix-ui";
import { forwardRef } from "react";

const Slot = RadixSlot.createSlot("@optiaxiom/react/FilteredSlot");

type FilteredSlotProps = RadixSlot.SlotProps & {
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
