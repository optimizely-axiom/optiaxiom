import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
} from "react";

import type { Command } from "../command";

import { Dialog } from "../dialog";
import { SpotlightContextProvider } from "../spotlight-context";
import { useEffectEvent } from "../use-event";

type SpotlightProps<Item> = {
  children: ReactNode;
  defaultOpen?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
} & ComponentPropsWithoutRef<typeof Command<Item>>;

export function Spotlight<Item>({
  children,
  defaultOpen = false,
  inputValue,
  isItemDisabled = () => false,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
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
  const onInputValueChangeStable = useEffectEvent(
    onInputValueChange ?? (() => {}),
  );
  useEffect(() => {
    if (!open) {
      onInputValueChangeStable("");
    }
  }, [open, onInputValueChangeStable]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <SpotlightContextProvider
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        itemToSubItems={itemToSubItems}
        onInputValueChange={onInputValueChange}
        onItemSelect={onItemSelect}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </SpotlightContextProvider>
    </Dialog>
  );
}

Spotlight.displayName = "@optiaxiom/react/Spotlight";
