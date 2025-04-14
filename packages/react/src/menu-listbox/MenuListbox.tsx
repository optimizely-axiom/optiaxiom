import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { type CommandOption, type Group } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { ListboxLabel } from "../listbox-label";
import { ListboxSeparator } from "../listbox-separator";
import { MenuCheckboxItem } from "../menu-checkbox-item";
import { useMenuContext } from "../menu-context";
import { MenuItem } from "../menu-item";
import { MenuRadioItem } from "../menu-radio-item";
import { MenuSub } from "../menu-sub";

type MenuListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const MenuListbox = forwardRef<HTMLDivElement, MenuListboxProps>(
  ({ children, ...props }, ref) => {
    const { size } = useMenuContext("@optiaxiom/react/MenuListbox");

    let isFirstItem = true;
    let lastGroup: Group | undefined = undefined;
    const shouldShowSeparator = (group: Group | undefined) => {
      const show = !isFirstItem;
      isFirstItem = false;
      return show && group && group !== lastGroup && group.separator;
    };
    const shouldShowGroup = (group: Group | undefined): group is Group => {
      const show = group !== lastGroup;
      lastGroup = group;
      return show && !group?.hidden;
    };

    return (
      <CommandListbox ref={ref} {...props}>
        {children ??
          ((item: CommandOption, index) => {
            if (index === 0) {
              isFirstItem = true;
              lastGroup = undefined;
            }

            const Comp =
              item.subOptions?.length && size === "sm"
                ? MenuSub
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
                <Comp item={item} />
              </>
            );
          })}
      </CommandListbox>
    );
  },
);

MenuListbox.displayName = "@optiaxiom/react/MenuListbox";
