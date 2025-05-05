import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command";
import { type CommandOption, resolveItemProperty } from "../command/internals";
import { ListboxLabel, ListboxSeparator } from "../listbox";
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

    let isFirstItem = true;
    let lastGroup: CommandOption["group"] = undefined;
    const shouldShowSeparator = (group: CommandOption["group"]) => {
      const show = !isFirstItem;
      isFirstItem = false;
      return (
        show &&
        group !== lastGroup &&
        (group?.separator || lastGroup?.separator)
      );
    };
    const shouldShowGroup = (
      group: CommandOption["group"],
    ): group is NonNullable<CommandOption["group"]> => {
      const show = group !== lastGroup;
      lastGroup = group;
      return show && !!group && !group?.hidden;
    };

    return (
      <CommandListbox ref={ref} {...props}>
        {children ??
          ((item: CommandOption, index) => {
            if (index === 0) {
              isFirstItem = true;
              lastGroup = undefined;
            }

            const Comp = item.subOptions?.length
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
                {shouldShowSeparator(group) && <ListboxSeparator />}
                {shouldShowGroup(group) && (
                  <ListboxLabel>{group.name}</ListboxLabel>
                )}
                {Comp === MenuSub ? (
                  <Comp item={item} />
                ) : (
                  <Tooltip content={resolveItemProperty(item.disabledReason)}>
                    <Comp item={item} />
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
