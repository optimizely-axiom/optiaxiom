import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";

type ComboboxItemProps = ComponentPropsWithoutRef<typeof CommandItem>;

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  (props, ref) => <CommandItem ref={ref} {...props} />,
);

ComboboxItem.displayName = "@optiaxiom/react/ComboboxItem";
