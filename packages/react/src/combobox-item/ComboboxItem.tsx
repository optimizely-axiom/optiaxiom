import { forwardRef } from "react";

import { Checkbox } from "../checkbox";
import { useComboboxContext } from "../combobox-context";
import { useComboboxListContext } from "../combobox-list-context";
import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";
import { extractSprinkles } from "../sprinkles";

type ComboboxItemProps = ListboxItemBaseProps<"li">;

export const ComboboxItem = forwardRef<HTMLLIElement, ComboboxItemProps>(
  ({ addonAfter, addonBefore, children, description, icon, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { downshift, highlightedItem, mode, value } =
      useComboboxContext("ComboboxItem");
    const { item } = useComboboxListContext("ComboboxItem");
    const itemProps = downshift.getItemProps({ item });

    return (
      <ListboxItemBase
        addonAfter={addonAfter}
        addonBefore={
          addonBefore ??
          (mode === "multiple" && (
            <Checkbox
              checked={
                Array.isArray(value) ? value.includes(item) : value === item
              }
              disabled={itemProps["aria-disabled"]}
              tabIndex={-1}
            />
          ))
        }
        description={description}
        icon={icon}
        {...sprinkleProps}
      >
        <li
          data-disabled={itemProps["aria-disabled"] ? "" : undefined}
          data-highlighted={highlightedItem === item ? "" : undefined}
          data-selected={downshift.selectedItem === item ? "" : undefined}
          ref={ref}
          {...restProps}
          {...itemProps}
        >
          {children}
        </li>
      </ListboxItemBase>
    );
  },
);

ComboboxItem.displayName = "@optiaxiom/react/ComboboxItem";
