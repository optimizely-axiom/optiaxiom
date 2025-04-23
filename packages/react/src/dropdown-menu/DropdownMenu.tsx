import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";

import { DropdownMenuProvider } from "./DropdownMenuContext";
import { DropdownMenuNestedProvider } from "./DropdownMenuNestedContext";

type MenuProps = {
  children?: React.ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   */
  defaultOpen?: boolean;
  /**
   * When enabled interaction with outside elements will be disabled and only dropdown content will be visible to screen readers.
   */
  modal?: boolean;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The open state in controlled mode.
   */
  open?: boolean;
};

export function DropdownMenu({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: MenuProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/DropdownMenu",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [presence, setPresence] = useState<boolean>();

  return (
    <RadixMenu.Root onOpenChange={setOpen} open={open || presence} {...props}>
      <DropdownMenuProvider
        open={open}
        presence={presence}
        setOpen={setOpen}
        setPresence={setPresence}
      >
        <DropdownMenuNestedProvider open={open}>
          {children}
        </DropdownMenuNestedProvider>
      </DropdownMenuProvider>
    </RadixMenu.Root>
  );
}

DropdownMenu.displayName = "@optiaxiom/react/DropdownMenu";
