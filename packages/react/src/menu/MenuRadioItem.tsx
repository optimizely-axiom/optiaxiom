import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { ListboxRadioItem } from "../listbox";

export type MenuRadioItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";
    const { inputValue } = useCommandContext("@optiaxiom/react/MenuRadioItem");

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxRadioItem
          addonBefore={resolveItemProperty(props.item.addon, { inputValue })}
          asChild
          description={resolveItemProperty(props.item.description, {
            inputValue,
          })}
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
