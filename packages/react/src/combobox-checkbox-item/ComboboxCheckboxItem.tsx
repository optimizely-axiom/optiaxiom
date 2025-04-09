import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandItem } from "../command-item";
import { ListboxCheckboxItem } from "../listbox-checkbox-item";

type ComboboxCheckboxItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxCheckboxItem>;

export const ComboboxCheckboxItem = forwardRef<
  HTMLDivElement,
  ComboboxCheckboxItemProps
>(({ children, ...props }, ref) => {
  const { inputValue } = useCommandContext(
    "@optiaxiom/react/ComboboxCheckboxItem",
  );

  return (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxCheckboxItem
        addonBefore={props.item.addon}
        onCheckedChange={() => props.item.execute?.({ inputValue })}
      >
        {children}
      </ListboxCheckboxItem>
    </CommandItem>
  );
});

ComboboxCheckboxItem.displayName = "@optiaxiom/react/ComboboxCheckboxItem";
