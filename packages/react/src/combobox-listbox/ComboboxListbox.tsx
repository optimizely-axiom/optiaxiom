import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxCheckboxItem } from "../combobox-checkbox-item";
import { ComboboxItem } from "../combobox-item";
import { ComboboxLabel } from "../combobox-label";
import { ComboboxRadioItem } from "../combobox-radio-item";
import { ComboboxSeparator } from "../combobox-separator";
import { ComboboxSub } from "../combobox-sub";
import { type CommandOption, type Group } from "../command-context";
import { CommandListbox } from "../command-listbox";

type ComboboxListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(
  ({ children, ...props }, ref) => {
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
      return show && !!group?.visible;
    };

    return (
      <CommandListbox ref={ref} tabIndex={-1} {...props}>
        {children ??
          ((item: CommandOption, index) => {
            if (index === 0) {
              isFirstItem = true;
              lastGroup = undefined;
            }

            const Comp = item.subItems?.length
              ? ComboboxSub
              : "selected" in item
                ? item.multi
                  ? ComboboxCheckboxItem
                  : ComboboxRadioItem
                : ComboboxItem;
            const group = item.group;
            return (
              <>
                {shouldShowSeparator(group) && <ComboboxSeparator />}
                {shouldShowGroup(group) && (
                  <ComboboxLabel>{group.name}</ComboboxLabel>
                )}
                <Comp item={item} />
              </>
            );
          })}
      </CommandListbox>
    );
  },
);

ComboboxListbox.displayName = "@optiaxiom/react/ComboboxListbox";
