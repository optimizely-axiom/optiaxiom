import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";

import type { Command } from "../command";

import { ComboboxContextProvider } from "../combobox-context";
import { ComboboxDialogContent } from "../combobox-dialog-content";
import { ComboboxPopoverContent } from "../combobox-popover-content";
import { Dialog } from "../dialog";
import { DialogTrigger } from "../dialog-trigger";
import { Popover } from "../popover";
import { PopoverTrigger } from "../popover-trigger";
import { useEffectEvent } from "../use-event";
import { useResponsiveMatches } from "../use-responsive-matches";

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
  value: valueProp,
}: ComboBoxProps<Item>) {
  const components = useResponsiveMatches({
    base: {
      Content: ComboboxDialogContent,
      Root: Dialog,
      Trigger: DialogTrigger,
    },
    sm: {
      Content: ComboboxPopoverContent,
      Root: Popover,
      Trigger: PopoverTrigger,
    },
  });

  const value = useMemo(
    () => (Array.isArray(valueProp) ? new Set(valueProp) : valueProp),
    [valueProp],
  );

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
    <components.Root onOpenChange={setOpen} open={open}>
      <ComboboxContextProvider
        components={components}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        onInputValueChange={onInputValueChange}
        onItemSelect={onItemSelect}
        open={open}
        setOpen={setOpen}
        value={value}
      >
        {children}
      </ComboboxContextProvider>
    </components.Root>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
