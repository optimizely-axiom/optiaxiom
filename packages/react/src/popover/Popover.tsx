import * as RadixPopover from "@radix-ui/react-popover";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";

import { PopoverProvider } from "./PopoverContext";

type PopoverProps = {
  children?: React.ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   */
  defaultOpen?: boolean;
  /**
   * When enabled interaction with outside elements will be disabled and only popover content will be visible to screen readers.
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

export function Popover({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: PopoverProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/Popover",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [presence, setPresence] = useState<boolean>();

  return (
    <RadixPopover.Root
      onOpenChange={setOpen}
      open={open || presence}
      {...props}
    >
      <PopoverProvider
        open={open}
        presence={presence}
        setPresence={setPresence}
      >
        {children}
      </PopoverProvider>
    </RadixPopover.Root>
  );
}

Popover.displayName = "@optiaxiom/react/Popover";
