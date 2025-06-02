import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { ListboxRadioItem } from "../listbox";

export type MenuRadioItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxRadioItem
          addonBefore={props.item.addon}
          asChild
          description={props.item.description}
        >
          <Comp {...(props.item.href && { href: props.item.href })}>
            {children}
          </Comp>
        </ListboxRadioItem>
      </CommandItem>
    );
  },
);

MenuRadioItem.displayName = "@optiaxiom/react/MenuRadioItem";
