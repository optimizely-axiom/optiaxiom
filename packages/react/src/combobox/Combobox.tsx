import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";

import type { Command } from "../command";
import type { ExtendProps } from "../utils";

import { ComboboxProvider } from "../combobox-context";
import { ComboboxDialogContent } from "../combobox-dialog-content";
import { ComboboxPopover } from "../combobox-popover";
import { ComboboxPopoverContent } from "../combobox-popover-content";
import { Dialog } from "../dialog";
import { DialogTrigger } from "../dialog-trigger";
import { PopoverTrigger } from "../popover-trigger";
import { useEffectEvent } from "../use-event";
import { useResponsiveMatches } from "../use-responsive-matches";

type ComboboxProps<Item> = ExtendProps<
  Omit<
    ComponentPropsWithoutRef<typeof Command<Item>>,
    "inputId" | "itemToSubItems" | "selectedItem" | "stateReducer"
  >,
  {
    children: ReactNode;
    /**
     * The initial open state in uncontrolled mode.
     */
    defaultOpen?: boolean;
    /**
     * Handler that is called when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The open state in controlled mode.
     */
    open?: boolean;
  }
>;

export function Combobox<Item>({
  children,
  defaultOpen = false,
  inputValue,
  isItemDisabled = () => false,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  onInputValueChange,
  onItemSelect,
  onOpenChange,
  open: openProp,
  value: valueProp,
}: ComboboxProps<Item>) {
  const components = useResponsiveMatches({
    base: {
      Content: ComboboxDialogContent,
      Root: Dialog,
      Trigger: DialogTrigger,
    },
    sm: {
      Content: ComboboxPopoverContent,
      Root: ComboboxPopover,
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
    if (open) {
      onInputValueChangeStable("");
    }
  }, [open, onInputValueChangeStable]);

  return (
    <components.Root onOpenChange={setOpen} open={open}>
      <ComboboxProvider
        components={components}
        inputValue={inputValue}
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
      </ComboboxProvider>
    </components.Root>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
