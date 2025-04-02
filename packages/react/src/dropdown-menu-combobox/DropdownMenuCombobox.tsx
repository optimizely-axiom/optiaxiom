import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useRef } from "react";

import type { ExcludeProps, ExtendProps } from "../utils";

import { Command } from "../command";
import { DropdownMenuComboboxProvider } from "../dropdown-menu-combobox-context";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { DropdownMenuSub } from "../dropdown-menu-sub";

type DropdownMenuComboboxProps<Item> = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof DropdownMenuSub>,
    ComponentPropsWithoutRef<typeof Command<Item>>
  >,
  "itemToSubItems"
>;

export function DropdownMenuCombobox<Item>({
  children,
  defaultOpen,
  onItemSelect,
  onOpenChange,
  open: openProp,
  ...props
}: DropdownMenuComboboxProps<Item>) {
  const { setOpen: setOpenRoot } = useDropdownMenuContext(
    "@optiaxiom/react/DropdownMenuCombobox",
  );
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DropdownMenuSub onOpenChange={setOpen} open={open}>
      <DropdownMenuComboboxProvider inputRef={inputRef}>
        <Command
          onItemSelect={(item) => {
            onItemSelect?.(item);
            setOpenRoot(false);
          }}
          {...props}
        >
          {children}
        </Command>
      </DropdownMenuComboboxProvider>
    </DropdownMenuSub>
  );
}

DropdownMenuCombobox.displayName = "@optiaxiom/react/DropdownMenuCombobox";
