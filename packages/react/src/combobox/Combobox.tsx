import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import type { Command } from "../command";

import { ComboboxContextProvider } from "../combobox-context";
import { Popover } from "../popover";

type ComboBoxProps<Item> = {
  children: ReactNode;
  defaultOpen?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
} & ComponentPropsWithoutRef<typeof Command<Item>>;

export function Combobox<Item>({
  children,
  defaultOpen = false,
  isItemDisabled = () => false,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onItemSelect,
  onOpenChange,
  open: openProp,
}: ComboBoxProps<Item>) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <ComboboxContextProvider
        isItemDisabled={isItemDisabled}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        onInputValueChange={onInputValueChange}
        onItemSelect={onItemSelect}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </ComboboxContextProvider>
    </Popover>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
