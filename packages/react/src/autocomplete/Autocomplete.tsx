import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode, useEffect, useState } from "react";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { useCombobox, type UseComboboxProps } from "../downshift";
import { useFieldContext } from "../field-context";
import { Popover } from "../popover";
import { useEffectEvent } from "../use-event";

type AutocompleteProps<Item> = {
  children?: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Item | null;
  disabled?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Item | null) => void;
  open?: boolean;
  value?: Item | null;
} & Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Autocomplete<Item>({
  children,
  defaultOpen = false,
  defaultValue,
  disabled,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onOpenChange,
  onValueChange,
  open,
  value,
  ...props
}: AutocompleteProps<Item>) {
  const { id: inputId } = useFieldContext({});

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
    items,
    itemToKey,
    itemToString,
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
