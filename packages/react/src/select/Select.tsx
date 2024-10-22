import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode } from "react";

import { useSelect, type UseSelectProps } from "../downshift";
import { SelectContextProvider } from "../select-context";

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

  const downshift = useSelect({
    ...props,
    isOpen,
    items,
    itemToKey,
    itemToString,
    onIsOpenChange({ isOpen }) {
      setIsOpen(isOpen);
    },
    onSelectedItemChange({ selectedItem }) {
      setSelectedItem(selectedItem);
    },
    selectedItem: selectedItem ?? null,
  });

  return (
    <Popper>
      <SelectContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={items[downshift.highlightedIndex]}
        isOpen={downshift.isOpen}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        selectedItem={selectedItem}
      >
        {children}
      </SelectContextProvider>
    </Popper>
  );
}

Select.displayName = "@optiaxiom/react/Select";
