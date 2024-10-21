import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect, type UseSelectProps } from "downshift";
import { type ReactNode } from "react";

import { Popover } from "../popover";
import { SelectContextProvider } from "../select-context";
import { useDelayedState } from "../use-delayed-state";

type SelectProps<Item> = {
  children?: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Item | null;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Item | null) => void;
  open?: boolean;
  value?: Item | null;
} & Pick<
  UseSelectProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Select<Item>({
  children,
  defaultOpen = false,
  defaultValue,
  disabled,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onOpenChange,
  onValueChange,
  open,
  value,
  ...props
}: SelectProps<Item>) {
  const [selectedItem, setSelectedItem] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: value,
  });

  const [isOpen, setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: open,
  });

  const [highlightedIndex, setHighlightedIndex] = useDelayedState(-1, isOpen);

  const downshift = useSelect({
    ...props,
    highlightedIndex,
    initialSelectedItem: value,
    isOpen,
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
