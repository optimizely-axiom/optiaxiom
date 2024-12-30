import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { Command } from "../command";
import { useFieldContext } from "../field-context";
import { useEffectEvent } from "../use-event";

type AutocompleteProps<Item> = Pick<
  ComponentPropsWithoutRef<typeof Command<Item>>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
> & {
  children?: ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   */
  defaultOpen?: boolean;
  /**
   * The initial selected value in uncontrolled mode.
   */
  defaultValue?: Item | null;
  /**
   * Whether the autocomplete input is disabled.
   */
  disabled?: boolean;
  /**
   * Handler that is called when input value changes.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Handler that is called when the selected value changes.
   */
  onValueChange?: (value: Item | null) => void;
  /**
   * The open state in controlled mode.
   */
  open?: boolean;
  /**
   * The selected value in controlled mode.
   */
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
