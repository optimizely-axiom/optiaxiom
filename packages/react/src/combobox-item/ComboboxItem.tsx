import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxItem } from "../listbox-item";

type ComboboxItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ children, ...props }, ref) => (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxItem
        addonBefore={props.item.addon}
        description={props.item.description}
      >
        {children}
      </ListboxItem>
    </CommandItem>
  ),
);

ComboboxItem.displayName = "@optiaxiom/react/ComboboxItem";
