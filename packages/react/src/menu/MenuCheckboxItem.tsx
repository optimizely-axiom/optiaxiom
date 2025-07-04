import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { ListboxCheckboxItem } from "../listbox";

export type MenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof CommandItem
> &
  ComponentPropsWithoutRef<typeof ListboxCheckboxItem>;

export const MenuCheckboxItem = forwardRef<
  HTMLDivElement,
  MenuCheckboxItemProps
>(({ children, ...props }, ref) => {
  const Comp = props.item.href ? "a" : "div";
  const { inputValue } = useCommandContext("@optiaxiom/react/MenuCheckboxItem");

  return (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxCheckboxItem
        addonBefore={resolveItemProperty(props.item.addon, { inputValue })}
        asChild
        description={resolveItemProperty(props.item.description, {
          inputValue,
        })}
        onCheckedChange={() =>
          !resolveItemProperty(props.item.disabledReason) &&
          props.item.execute?.({ dismiss: false, inputValue })
        }
      >
        <Comp {...(props.item.href && { href: props.item.href })}>
          {children}
        </Comp>
      </ListboxCheckboxItem>
    </CommandItem>
  );
});

MenuCheckboxItem.displayName = "@optiaxiom/react/MenuCheckboxItem";
