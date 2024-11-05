import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useEffect } from "react";

import { ComboboxContextProvider } from "../combobox-context";
import { Popover } from "../popover";

type ComboBoxProps<Item> = {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Item;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Item) => void;
  open?: boolean;
  value?: Item;
} & Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Combobox<Item>({
  children,
  defaultOpen = false,
  defaultValue,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
  ...props
}: ComboBoxProps<Item>) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
  });
  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open, setInputValue]);

  const downshift = useCombobox({
    ...props,
    inputValue,
    isOpen: open,
    items,
    itemToKey,
    itemToString,
    onSelectedItemChange({ selectedItem, type }) {
      if (type !== useCombobox.stateChangeTypes.InputBlur) {
        setValue(selectedItem);
        setOpen(false);
      }
    },
    selectedItem: value ?? null,
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getInputProps({}, { suppressRefError: true });
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <ComboboxContextProvider
        downshift={downshift}
        highlightedItem={items[downshift.highlightedIndex]}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        open={open}
        setInputValue={setInputValue}
        setOpen={setOpen}
        setValue={setValue}
        value={value}
      >
        {children}
      </ComboboxContextProvider>
    </Popover>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
