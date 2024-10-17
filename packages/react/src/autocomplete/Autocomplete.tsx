import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useEffect, useState } from "react";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { useFieldContext } from "../field-context";
import { Popover } from "../popover";
import { useDelayedState } from "../use-delayed-state";
import { useEffectEvent } from "../use-event";

type AutocompleteProps<Item> = {
  children?: ReactNode;
  defaultValue?: Item | null;
  disabled?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onValueChange?: (value: Item | null) => void;
  value?: Item | null;
} & Pick<
  UseComboboxProps<Item>,
  | "initialHighlightedIndex"
  | "isItemDisabled"
  | "items"
  | "itemToKey"
  | "itemToString"
>;

export function Autocomplete<Item>({
  children,
  defaultValue,
  disabled,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onValueChange,
  value,
  ...props
}: AutocompleteProps<Item>) {
  const { id: inputId } = useFieldContext({});

  const [selectedItem, setSelectedItem] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: value,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    itemToString(selectedItem ?? null),
  );
  const itemToStringStable = useEffectEvent(itemToString);
  useEffect(() => {
    if (!isOpen) {
      setInputValue(itemToStringStable(selectedItem ?? null));
    }
  }, [isOpen, itemToStringStable, selectedItem]);

  /**
   * Downshift attempts to scroll to the currently selected item when the menu
   * opens. But since we don't render the menu until it is open the `ref` will
   * not be available yet.
   *
   * So we hold the active highlightedIndex in a ref/queue on first open and
   * wait for next effect/tick to set the highlightedIndex state.
   */
  const [highlightedIndex, setHighlightedIndex] = useDelayedState(-1, isOpen);

  const downshift = useCombobox({
    ...props,
    highlightedIndex,
    inputId,
    inputValue,
    isOpen,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange({ highlightedIndex }) {
      setHighlightedIndex(highlightedIndex);
    },
    onInputValueChange({ inputValue, isOpen }) {
      if (isOpen) {
        onInputValueChange?.(inputValue);
      }
    },
    onIsOpenChange({ isOpen }) {
      setIsOpen(isOpen);
      if (!isOpen) {
        onInputValueChange?.("");
      }
    },
    onSelectedItemChange({ selectedItem }) {
      setSelectedItem(selectedItem);
    },
    selectedItem: selectedItem ?? null,
  });

  return (
    <Popover open={isOpen}>
      <AutocompleteContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={items[downshift.highlightedIndex]}
        items={items}
        itemToKey={itemToKey}
        setInputValue={setInputValue}
      >
        {children}
      </AutocompleteContextProvider>
    </Popover>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
