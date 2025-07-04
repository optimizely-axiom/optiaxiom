import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { ListboxItem } from "../listbox";

export type MenuItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";
    const { inputValue } = useCommandContext("@optiaxiom/react/MenuItem");

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxItem
          addonBefore={resolveItemProperty(props.item.addon, { inputValue })}
          asChild
          description={resolveItemProperty(props.item.description, {
            inputValue,
          })}
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
