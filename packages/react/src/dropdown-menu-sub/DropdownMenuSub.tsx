import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useEffect } from "react";

import {
  DropdownMenuNestedProvider,
  useDropdownMenuNestedContext,
} from "../dropdown-menu-nested-context";
import { DropdownMenuSubProvider } from "../dropdown-menu-sub-context";

type MenuSubProps = {
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
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: MenuSubProps) {
  const [open, setOpen] = useControllableState({
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

  return (
    <RadixMenu.Sub onOpenChange={setOpen} open={open} {...props}>
      <DropdownMenuSubProvider open={open}>
        <DropdownMenuNestedProvider open={open}>
          {children}
        </DropdownMenuNestedProvider>
      </DropdownMenuSubProvider>
    </RadixMenu.Sub>
  );
}

DropdownMenuSub.displayName = "@optiaxiom/react/DropdownMenuSub";
