import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { ListboxItem } from "../listbox";

export type MenuItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxItem
          addonBefore={props.item.addon}
          asChild
          description={props.item.description}
          intent={props.item.intent}
        >
          <Comp {...(props.item.href && { href: props.item.href })}>
            {children}
          </Comp>
        </ListboxItem>
      </CommandItem>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
