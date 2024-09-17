import { Popover } from "@radix-ui/react-popover";
import { useCombobox } from "downshift";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { type BoxProps } from "../box";

type AutocompleteProps = BoxProps<
  typeof Popover,
  {
    disabled?: boolean;
    initialHighlightedIndex?: number;
    isItemDisabled?: (item: unknown) => boolean;
    itemToKey?: (item: unknown) => string;
    itemToString?: (item: unknown) => string;
    items: unknown[];
    onInputValueChange: (inputValue: string) => void;
    onValueChange?: (value: string) => void;
    value?: string;
  }
>;

export function Autocomplete({
  children,
  defaultOpen,
  disabled,
  initialHighlightedIndex,
  isItemDisabled,
  itemToKey,
  itemToString,
  items,
  onInputValueChange,
  onValueChange,
  value = "",
  ...props
}: AutocompleteProps) {
  const downshift = useCombobox({
    initialHighlightedIndex: initialHighlightedIndex,
    initialIsOpen: defaultOpen,
    initialSelectedItem: itemToString
      ? items.find((item) => itemToString(item) === value)
      : value,
    isItemDisabled(item) {
      return isItemDisabled ? isItemDisabled(item) : false;
    },
    itemToKey(item) {
      return itemToKey ? itemToKey(item) : item;
    },
    itemToString(item) {
      return itemToString ? itemToString(item) : String(item);
    },
    items,
    onInputValueChange({ inputValue, isOpen }) {
      onInputValueChange(isOpen ? inputValue : "");
    },

    onStateChange({ type }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          downshift.selectItem(downshift.selectedItem ?? "");
          break;
      }
    },

    onSelectedItemChange({ selectedItem }) {
      onValueChange?.(
        itemToString ? itemToString(selectedItem) : (selectedItem as string),
      );
    },
  });
  const highlightedItem = items[downshift.highlightedIndex];

  return (
    <Popover {...props}>
      <AutocompleteContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={highlightedItem}
        itemToString={itemToString}
        items={items}
        onValueChange={onValueChange}
      >
        {children}
      </AutocompleteContextProvider>
    </Popover>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
