import { Slot, type SlotProps } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type FilteredSlotProps = SlotProps & {
  exclude: string;
};

export const FilteredSlot = forwardRef<HTMLElement, FilteredSlotProps>(
  ({ exclude, ...props }, ref) => {
    delete props[exclude as keyof typeof props];
    return <Slot ref={ref} {...props} />;
  },
);

FilteredSlot.displayName = "@optiaxiom/react/FilteredSlot";
