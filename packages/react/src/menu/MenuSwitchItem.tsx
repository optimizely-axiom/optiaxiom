import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { ListboxSwitchItem } from "../listbox";

export type MenuSwitchItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxSwitchItem>;

export const MenuSwitchItem = forwardRef<HTMLDivElement, MenuSwitchItemProps>(
  ({ children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";
    const { inputValue } = useCommandContext("@optiaxiom/react/MenuSwitchItem");

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxSwitchItem
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
        </ListboxSwitchItem>
      </CommandItem>
    );
  },
);

MenuSwitchItem.displayName = "@optiaxiom/react/MenuSwitchItem";
