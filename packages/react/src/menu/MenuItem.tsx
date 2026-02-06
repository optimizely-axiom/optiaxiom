import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command";
import { resolveItemProperty, useCommandContext } from "../command/internals";
import { IconUpRightFromSquare } from "../icons/IconUpRightFromSquare";
import { ListboxItem } from "../listbox";
import { useMenuContext } from "./MenuContext";

export type MenuItemProps = ComponentPropsWithoutRef<typeof CommandItem> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ addonAfter, children, ...props }, ref) => {
    const Comp = props.item.href ? "a" : "div";
    const { highlightedItem, inputValue } = useCommandContext(
      "@optiaxiom/react/MenuItem",
    );
    const { focusVisible } = useMenuContext("@optiaxiom/react/MenuItem");

    return (
      <CommandItem asChild ref={ref} {...props}>
        <ListboxItem
          addonAfter={
            props.item.href && props.item.external ? (
              <IconUpRightFromSquare />
            ) : (
              addonAfter
            )
          }
          addonBefore={resolveItemProperty(props.item.addon, { inputValue })}
          asChild
          data-focus-visible={
            focusVisible && highlightedItem === props.item ? "" : undefined
          }
          description={resolveItemProperty(props.item.description, {
            inputValue,
          })}
          intent={props.item.intent}
        >
          <Comp
            {...(props.item.href && { href: props.item.href })}
            {...(props.item.href &&
              props.item.external && {
                rel: "noopener noreferrer",
                target: "_blank",
              })}
          >
            {children}
          </Comp>
        </ListboxItem>
      </CommandItem>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
