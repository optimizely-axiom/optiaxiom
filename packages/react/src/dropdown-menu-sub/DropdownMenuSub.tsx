import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

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
  const { open: parentOpen } = useDropdownMenuNestedContext(
    "@optiaxiom/react/DropdownMenuSub",
  );
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const resolvedOpen = parentOpen && open;

  return (
    <RadixMenu.Sub onOpenChange={setOpen} open={resolvedOpen} {...props}>
      <DropdownMenuSubProvider open={resolvedOpen}>
        <DropdownMenuNestedProvider open={resolvedOpen}>
          {children}
        </DropdownMenuNestedProvider>
      </DropdownMenuSubProvider>
    </RadixMenu.Sub>
  );
}

DropdownMenuSub.displayName = "@optiaxiom/react/DropdownMenuSub";
