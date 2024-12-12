import type { UseComboboxProps } from "downshift";

import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode, useEffect, useState } from "react";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { Command } from "../command";
import { useFieldContext } from "../field-context";
import { useEffectEvent } from "../use-event";

type AutocompleteProps<Item> = Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
> & {
  children?: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Item | null;
  disabled?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Item | null) => void;
  open?: boolean;
  value?: Item | null;
};

export function Autocomplete<Item>({
  children,
  defaultOpen = false,
  defaultValue,
  disabled,
  isItemDisabled,
  items,
  itemToKey,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onOpenChange,
  onValueChange,
  open,
  value,
}: AutocompleteProps<Item>) {
  const { inputId } = useFieldContext({});

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

  return (
    <Popper>
      <Command
        inputId={inputId}
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        onInputValueChange={(value) => {
          setInputValue(value);
          onInputValueChange?.(value);
        }}
        onItemSelect={setSelectedItem}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            onInputValueChange?.("");
          }
        }}
        open={isOpen}
        selectedItem={selectedItem ?? null}
      >
        <AutocompleteContextProvider
          disabled={disabled}
          isOpen={isOpen}
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        >
          {children}
        </AutocompleteContextProvider>
      </Command>
    </Popper>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
