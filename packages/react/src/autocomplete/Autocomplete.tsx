import type { ReactNode } from "react";

import { Popover } from "@radix-ui/react-popover";
import { type UseComboboxProps, useCombobox } from "downshift";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { useFieldContext } from "../field-context";

type AutocompleteProps<Item> = {
  children?: ReactNode;
  disabled?: boolean;
  onValueChange?: (value: Item) => void;
  value?: Item;
} & Pick<
  UseComboboxProps<Item>,
  | "initialHighlightedIndex"
  | "isItemDisabled"
  | "itemToKey"
  | "itemToString"
  | "items"
  | "onInputValueChange"
>;

export function Autocomplete<Item>({
  children,
  disabled,
  items,
  onInputValueChange,
  onValueChange,
  value,
  ...props
}: AutocompleteProps<Item>) {
  const { id: inputId } = useFieldContext({});

  const downshift = useCombobox({
    ...props,
    initialSelectedItem: value,
    inputId,
    items,
    onInputValueChange(changes) {
      onInputValueChange?.({
        ...changes,
        inputValue: changes.isOpen ? changes.inputValue : "",
      });
    },
    onSelectedItemChange({ selectedItem }) {
      onValueChange?.(selectedItem);
    },
    onStateChange({ type }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          downshift.selectItem(downshift.selectedItem);
          break;
      }
    },
  });

  const highlightedItem = items[downshift.highlightedIndex];

  return (
    <Popover open={downshift.isOpen}>
      <AutocompleteContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={highlightedItem}
        items={items}
      >
        {children}
      </AutocompleteContextProvider>
    </Popover>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
