import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useEffect } from "react";

import { ComboboxContextProvider } from "../combobox-context";
import { Popover } from "../popover";

type ComboBoxProps<Item, Mode extends "multiple" | "single" = "single"> = {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: Mode extends "multiple" ? Item[] : Item;
  mode: Mode;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: Mode extends "multiple" ? Item[] : Item) => void;
  open?: boolean;
  value?: Mode extends "multiple" ? Item[] : Item;
} & Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Combobox<Item, Mode extends "multiple" | "single" = "single">({
  children,
  defaultOpen = false,
  defaultValue,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  mode: modeProp,
  onInputValueChange,
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
  ...props
}: ComboBoxProps<Item, Mode>) {
  const mode = modeProp ?? "single";
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useControllableState<Item | Item[]>({
    defaultProp: defaultValue ?? (mode === "multiple" ? [] : undefined),
    onChange: onValueChange as (value: Item | Item[]) => void,
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
        if (mode === "single" || !Array.isArray(value)) {
          setValue(selectedItem);
        } else {
          setValue(
            value.includes(selectedItem)
              ? value.filter((v) => v !== selectedItem)
              : [...value, selectedItem],
          );
        }
      }
      if (
        mode === "single" ||
        type === useCombobox.stateChangeTypes.InputKeyDownEnter
      ) {
        setOpen(false);
      }
    },
    selectedItem: mode === "multiple" ? null : ((value as Item) ?? null),
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
        mode={mode}
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
