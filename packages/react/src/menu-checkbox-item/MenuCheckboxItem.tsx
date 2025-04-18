import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandItem } from "../command-item";
import { ListboxCheckboxItem } from "../listbox-checkbox-item";

type MenuCheckboxItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxCheckboxItem>;

export const MenuCheckboxItem = forwardRef<
  HTMLDivElement,
  MenuCheckboxItemProps
>(({ children, ...props }, ref) => {
  const Comp = props.item.link ? "a" : "div";
  const { inputValue } = useCommandContext("@optiaxiom/react/MenuCheckboxItem");

  return (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxCheckboxItem
        addonBefore={props.item.addon}
        asChild
        description={props.item.description}
        onCheckedChange={() => props.item.execute?.({ inputValue })}
      >
        <Comp {...(props.item.link && { href: props.item.link })}>
          {children}
        </Comp>
      </ListboxCheckboxItem>
    </CommandItem>
  );
});

MenuCheckboxItem.displayName = "@optiaxiom/react/MenuCheckboxItem";
