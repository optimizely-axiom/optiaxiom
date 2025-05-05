import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useEffect, useState } from "react";

import {
  DropdownMenuNestedProvider,
  useDropdownMenuNestedContext,
} from "./DropdownMenuNestedContext";
import { DropdownMenuSubProvider } from "./DropdownMenuSubContext";

export type DropdownMenuSubProps = {
  children?: React.ReactNode;
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
};

export function DropdownMenuSub({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: DropdownMenuSubProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/DropdownMenuSub",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const { open: parentOpen } = useDropdownMenuNestedContext(
    "@optiaxiom/react/DropdownMenuSub",
  );
  useEffect(() => {
    if (!parentOpen) {
      setOpen(false);
    }
  }, [parentOpen, setOpen]);
  const [presence, setPresence] = useState<boolean>(false);

  return (
    <RadixMenu.Sub onOpenChange={setOpen} open={open || presence} {...props}>
      <DropdownMenuSubProvider
        open={open}
        presence={presence}
        setPresence={setPresence}
      >
        <DropdownMenuNestedProvider open={open || presence}>
          {children}
        </DropdownMenuNestedProvider>
      </DropdownMenuSubProvider>
    </RadixMenu.Sub>
  );
}

DropdownMenuSub.displayName = "@optiaxiom/react/DropdownMenuSub";
