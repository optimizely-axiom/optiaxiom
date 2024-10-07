import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type UseComboboxProps, useCombobox } from "downshift";
import { type ReactNode, useEffect, useState } from "react";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { useFieldContext } from "../field-context";
import { Popover } from "../popover";
import { useEffectEvent } from "../use-event";

type AutocompleteProps<Item> = {
  children?: ReactNode;
  defaultValue?: Item;
  disabled?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onValueChange?: (value: Item) => void;
  value?: Item;
} & Pick<
  UseComboboxProps<Item>,
  | "initialHighlightedIndex"
  | "isItemDisabled"
  | "itemToKey"
  | "itemToString"
  | "items"
>;

export function Autocomplete<Item>({
  children,
  defaultValue,
  disabled,
  itemToString = (value) => (value ? String(value) : ""),
  items,
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

  const downshift = useCombobox({
    ...props,
    inputId,
    inputValue,
    isOpen,
    itemToString,
    items,
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
        setInputValue={setInputValue}
      >
        {children}
      </AutocompleteContextProvider>
    </Popover>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
