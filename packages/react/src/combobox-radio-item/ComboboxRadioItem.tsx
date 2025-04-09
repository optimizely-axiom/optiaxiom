import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type ComboboxRadioItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const ComboboxRadioItem = forwardRef<
  HTMLDivElement,
  ComboboxRadioItemProps
>(({ children, ...props }, ref) => {
  return (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxRadioItem addonBefore={props.item.addon}>
        {children}
      </ListboxRadioItem>
    </CommandItem>
  );
});

ComboboxRadioItem.displayName = "@optiaxiom/react/ComboboxRadioItem";
