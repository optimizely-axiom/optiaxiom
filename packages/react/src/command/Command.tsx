import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useEffect } from "react";

import { CommandContextProvider } from "../command-context";

type CommandProps<Item> = {
  children: ReactNode;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: Item) => void;
} & Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Command<Item>({
  children,
  isItemDisabled = () => false,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onOpenChange,
  onSelect,
}: CommandProps<Item>) {
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
  });
  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, [setInputValue]);

  const downshift = useCombobox({
    inputValue,
    isItemDisabled,
    isOpen: true,
    items,
    itemToKey,
    itemToString,
    onSelectedItemChange({ selectedItem, type }) {
      if (type !== useCombobox.stateChangeTypes.InputBlur) {
        onSelect?.(selectedItem);
      }
    },
    selectedItem: null,
  });

  return (
    <CommandContextProvider
      downshift={downshift}
      highlightedItem={items[downshift.highlightedIndex]}
      isItemDisabled={isItemDisabled}
      items={items}
      itemToKey={itemToKey}
      itemToString={itemToString}
      setInputValue={setInputValue}
      setOpen={onOpenChange}
      setValue={onSelect}
    >
      {children}
    </CommandContextProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
