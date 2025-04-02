import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import type { ExcludeProps, ExtendProps } from "../utils";

import { ComboboxProvider } from "../combobox-context";
import { ComboboxDialogContent } from "../combobox-dialog-content";
import { ComboboxPopover } from "../combobox-popover";
import { ComboboxPopoverContent } from "../combobox-popover-content";
import { Command } from "../command";
import { Dialog } from "../dialog";
import { DialogTrigger } from "../dialog-trigger";
import { PopoverTrigger } from "../popover-trigger";
import { useResponsiveMatches } from "../use-responsive-matches";

type ComboboxProps<Item> = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof Command<Item>>,
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
  >,
  "itemToSubItems"
>;

export function Combobox<Item>({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
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

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <components.Root onOpenChange={setOpen} open={open}>
      <ComboboxProvider components={components} open={open} setOpen={setOpen}>
        <Command {...props}>{children}</Command>
      </ComboboxProvider>
    </components.Root>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
