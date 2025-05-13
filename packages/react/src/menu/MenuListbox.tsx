import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command";
import { type CommandOption, resolveItemProperty } from "../command/internals";
import { ListboxLabel, ListboxSeparator } from "../listbox";
import { shouldShowGroup, shouldShowSeparator } from "../listbox/utils";
import { Tooltip } from "../tooltip";
import { MenuCheckboxItem } from "./MenuCheckboxItem";
import { useMenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuRadioItem } from "./MenuRadioItem";
import { MenuSub } from "./MenuSub";

export type MenuListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const MenuListbox = forwardRef<HTMLDivElement, MenuListboxProps>(
  ({ children, ...props }, ref) => {
    const { size } = useMenuContext("@optiaxiom/react/MenuListbox");

    return (
      <CommandListbox ref={ref} {...props}>
        {children ??
          ((
            item: CommandOption,
            index: number,
            prevItem: CommandOption | undefined,
          ) => {
            const Comp =
              typeof item.subOptions === "function" || item.subOptions?.length
                ? size === "sm"
                  ? MenuSub
                  : MenuItem
                : "selected" in item
                  ? item.multi
                    ? MenuCheckboxItem
                    : MenuRadioItem
                  : MenuItem;
            const group = item.group;
            return (
              <>
                {shouldShowSeparator(group, prevItem) && <ListboxSeparator />}
                {shouldShowGroup(group, prevItem) && (
                  <ListboxLabel>{group.label}</ListboxLabel>
                )}
                {Comp === MenuSub ? (
                  <Comp index={index} item={item} />
                ) : (
                  <Tooltip content={resolveItemProperty(item.disabledReason)}>
                    <Comp index={index} item={item} />
                  </Tooltip>
                )}
              </>
            );
          })}
      </CommandListbox>
    );
  },
);

MenuListbox.displayName = "@optiaxiom/react/MenuListbox";
