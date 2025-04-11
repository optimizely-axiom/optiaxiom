import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type MenuRadioItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxRadioItem addonBefore={props.item.addon}>
          {children}
        </ListboxRadioItem>
      </CommandItem>
    );
  },
);

MenuRadioItem.displayName = "@optiaxiom/react/MenuRadioItem";
