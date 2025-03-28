import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
} from "react";

import type { Command } from "../command";

import { Dialog } from "../dialog";
import { SpotlightProvider } from "../spotlight-context";
import { useCommandItems } from "../use-command-items";

type SpotlightProps<Item> = ComponentPropsWithoutRef<typeof Command<Item>> & {
  children: ReactNode;
  defaultOpen?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export function Spotlight<Item>({
  children,
  defaultItems,
  defaultOpen = false,
  inputValue: inputValueProp,
  isItemDisabled = () => false,
  items: itemsProp,
  itemToLabel = (value) => (value ? String(value) : ""),
  itemToSubItems,
  onInputValueChange,
  onItemSelect,
  onOpenChange,
  open: openProp,
}: SpotlightProps<Item>) {
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
    if (!open) {
      setInputValue("");
    }
  }, [open, setInputValue]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <SpotlightProvider
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToLabel={itemToLabel}
        itemToSubItems={itemToSubItems}
        onInputValueChange={setInputValue}
        onItemSelect={onItemSelect}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </SpotlightProvider>
    </Dialog>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
