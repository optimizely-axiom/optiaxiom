import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "../command/internals";
import { ListboxLabel, ListboxSeparator } from "../listbox";
import { shouldShowGroup, shouldShowSeparator } from "../listbox/utils";
import { Popover } from "../popover";
import { Tooltip } from "../tooltip";
import { MenuCheckboxItem } from "./MenuCheckboxItem";
import { useMenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuRadioItem } from "./MenuRadioItem";
import { MenuSubContent } from "./MenuSubContent";
import { useMenuSubContext } from "./MenuSubContext";
import { MenuSubTrigger } from "./MenuSubTrigger";
import { MenuSwitchItem } from "./MenuSwitchItem";

export type MenuListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const MenuListbox = forwardRef<HTMLDivElement, MenuListboxProps>(
  ({ children, ...props }, ref) => {
    const { inputValue } = useCommandContext("@optiaxiom/react/MenuListbox");
    const { size } = useMenuContext("@optiaxiom/react/MenuListbox");
    const { open } = useMenuSubContext("@optiaxiom/react/MenuListbox");

    return (
      <>
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
                    ? MenuSubTrigger
                    : MenuItem
                  : "selected" in item
                    ? item.multi
                      ? MenuCheckboxItem
                      : item.switch
                        ? MenuSwitchItem
                        : MenuRadioItem
                    : MenuItem;
              const group = item.group;
              return (
                <>
                  {shouldShowSeparator(group, prevItem) && <ListboxSeparator />}
                  {shouldShowGroup(group, prevItem) && (
                    <ListboxLabel>{group.label}</ListboxLabel>
                  )}
                  {Comp === MenuSubTrigger ? (
                    <Tooltip content={resolveItemProperty(item.disabledReason)}>
                      <MenuSubTrigger index={index} item={item} />
                    </Tooltip>
                  ) : (
                    <Tooltip content={resolveItemProperty(item.disabledReason)}>
                      <Comp index={index} item={item} />
                    </Tooltip>
                  )}
                </>
              );
            })}
        </CommandListbox>
        {!inputValue && size === "sm" && (
          <Popover open={open}>
            <MenuSubContent />
          </Popover>
        )}
      </>
    );
  },
);

MenuListbox.displayName = "@optiaxiom/react/MenuListbox";
