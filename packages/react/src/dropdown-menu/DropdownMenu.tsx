import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { DropdownMenuContextProvider } from "../dropdown-menu-context";

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
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: MenuProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixMenu.Root onOpenChange={setOpen} open={open} {...props}>
      <DropdownMenuContextProvider open={open}>
        {children}
      </DropdownMenuContextProvider>
    </RadixMenu.Root>
  );
}

DropdownMenu.displayName = "@optiaxiom/react/DropdownMenu";
