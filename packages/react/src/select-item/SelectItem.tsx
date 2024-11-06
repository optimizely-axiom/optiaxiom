import { forwardRef } from "react";

import { MenuItemBase, type MenuItemBaseProps } from "../menu-item-base";
import { useSelectContext } from "../select-context";
import { SelectItemContextProvider } from "../select-item-context";
import { extractSprinkles } from "../sprinkles";

type SelectItemProps = MenuItemBaseProps<
  "li",
  {
    item: unknown;
  }
>;

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>(
  (
    { addonAfter, addonBefore, children, description, icon, item, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, highlightedItem, selectedItem } =
      useSelectContext("SelectItem");

    const itemProps = downshift.getItemProps({ item });

    return (
      <SelectItemContextProvider active={selectedItem === item}>
        <MenuItemBase
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          description={description}
          icon={icon}
          {...sprinkleProps}
        >
          <li
            data-disabled={itemProps["aria-disabled"] ? "" : undefined}
            data-highlighted={highlightedItem === item ? "" : undefined}
            data-selected={selectedItem === item ? "" : undefined}
            ref={ref}
            {...restProps}
            {...itemProps}
          >
            {children}
          </li>
        </MenuItemBase>
      </SelectItemContextProvider>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
