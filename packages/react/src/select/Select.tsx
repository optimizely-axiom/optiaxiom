import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect, type UseSelectProps } from "downshift";
import { type ReactNode } from "react";

import { usePortalPatch } from "../downshift";
import { SelectProvider } from "../select-context";

type SelectProps<Item> = Pick<
  UseSelectProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
> & {
  children?: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Item | null;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Item | null) => void;
  open?: boolean;
  value?: Item | null;
};

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

  const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
    usePortalPatch(
      isOpen,
      selectedItem
        ? items.findIndex((item) => itemToKey(selectedItem) === itemToKey(item))
        : -1,
    );

  const downshift = useSelect({
    ...props,
    defaultHighlightedIndex: selectedItem
      ? items.findIndex((item) => itemToKey(selectedItem) === itemToKey(item))
      : 0,
    highlightedIndex,
    isOpen: placed,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange(changes) {
      setHighlightedIndex(changes.highlightedIndex);
    },
    onIsOpenChange({ isOpen }) {
      setIsOpen(isOpen);
    },
    onSelectedItemChange({ selectedItem, type }) {
      setSelectedItem((prevSelectedItem) =>
        selectedItem &&
        prevSelectedItem &&
        type !== useSelect.stateChangeTypes.ToggleButtonBlur &&
        itemToKey(selectedItem) === itemToKey(prevSelectedItem)
          ? null
          : selectedItem,
      );
    },
    selectedItem: null,
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <Popper>
      <SelectProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={items[highlightedIndex]}
        isOpen={isOpen}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        placed={placed}
        selectedItem={selectedItem}
        setPlaced={setPlaced}
      >
        {children}
      </SelectProvider>
    </Popper>
  );
}

Select.displayName = "@optiaxiom/react/Select";
