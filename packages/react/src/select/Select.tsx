import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect, type UseSelectProps } from "downshift";
import { type ReactNode, useState } from "react";

import { useFieldContext } from "../field-context";
import { Popover } from "../popover";
import { SelectContextProvider } from "../select-context";
import { useDelayedState } from "../use-delayed-state";

type SelectProps<Item> = {
  children?: ReactNode;
  defaultValue?: Item | null;
  disabled?: boolean;
  onValueChange?: (value: Item | null) => void;
  value?: Item | null;
} & Pick<
  UseSelectProps<Item>,
  | "initialHighlightedIndex"
  | "isItemDisabled"
  | "items"
  | "itemToKey"
  | "itemToString"
>;

export function Select<Item>({
  children,
  defaultValue,
  disabled,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onValueChange,
  value,
  ...props
}: SelectProps<Item>) {
  const { id: toggleButtonId } = useFieldContext();

  const [selectedItem, setSelectedItem] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: value,
  });

  const [isOpen, setIsOpen] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useDelayedState(-1, isOpen);

  const downshift = useSelect({
    ...props,
    highlightedIndex,
    initialSelectedItem: value,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange({ highlightedIndex }) {
      setHighlightedIndex(highlightedIndex);
    },
    onIsOpenChange({ isOpen }) {
      setIsOpen(isOpen);
    },
    onSelectedItemChange({ selectedItem }) {
      setSelectedItem(selectedItem);
    },
    selectedItem: selectedItem ?? null,
    toggleButtonId,
  });

  return (
    <Popover open={downshift.isOpen}>
      <SelectContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={items[downshift.highlightedIndex]}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        selectedItem={selectedItem}
      >
        {children}
      </SelectContextProvider>
    </Popover>
  );
}

Select.displayName = "@optiaxiom/react/Select";
