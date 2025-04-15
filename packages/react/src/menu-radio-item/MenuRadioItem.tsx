import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type MenuRadioItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.link ? "a" : "div";

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxRadioItem
          addonBefore={props.item.addon}
          asChild
          description={props.item.description}
        >
          <Comp {...(props.item.link && { href: props.item.link })}>
            {children}
          </Comp>
        </ListboxRadioItem>
      </CommandItem>
    );
  },
);

MenuRadioItem.displayName = "@optiaxiom/react/MenuRadioItem";
