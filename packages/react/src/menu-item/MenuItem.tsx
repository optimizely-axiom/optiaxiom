import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxItem } from "../listbox-item";

type MenuItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
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

MenuItem.displayName = "@optiaxiom/react/MenuItem";
