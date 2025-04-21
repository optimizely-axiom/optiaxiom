import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { ListboxItem } from "../listbox";

type MenuItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.link ? "a" : "div";

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxItem
          addonBefore={props.item.addon}
          asChild
          description={props.item.description}
        >
          <Comp {...(props.item.link && { href: props.item.link })}>
            {children}
          </Comp>
        </ListboxItem>
      </CommandItem>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
