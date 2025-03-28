import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

import type { Command } from "../command";
import type { ExcludeProps, ExtendProps } from "../utils";

import { DropdownMenuComboboxProvider } from "../dropdown-menu-combobox-context";
import { DropdownMenuSub } from "../dropdown-menu-sub";
import { useCommandItems } from "../use-command-items";

type DropdownMenuComboboxProps<Item> = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof DropdownMenuSub>,
    ComponentPropsWithoutRef<typeof Command<Item>>
  >,
  "itemToSubItems"
>;

export function DropdownMenuCombobox<Item>({
  children,
  defaultItems,
  defaultOpen,
  inputValue: inputValueProp,
  isItemDisabled,
  isItemSelected,
  items: itemsProp,
  itemToLabel = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onItemSelect,
  onOpenChange,
  open: openProp,
}: DropdownMenuComboboxProps<Item>) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const [items, inputValue, setInputValue] = useCommandItems({
    defaultItems,
    inputValue: inputValueProp,
    items: itemsProp,
    itemToLabel,
    onInputValueChange,
  });
  useEffect(() => {
    if (open) {
      setInputValue("");
    }
  }, [open, setInputValue]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DropdownMenuSub onOpenChange={setOpen} open={open}>
      <DropdownMenuComboboxProvider
        inputRef={inputRef}
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        isItemSelected={isItemSelected}
        items={items}
        itemToLabel={itemToLabel}
        onInputValueChange={setInputValue}
        onItemSelect={onItemSelect}
      >
        {children}
      </DropdownMenuComboboxProvider>
    </DropdownMenuSub>
  );
}

DropdownMenuCombobox.displayName = "@optiaxiom/react/DropdownMenuCombobox";
