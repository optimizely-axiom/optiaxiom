import * as RadixPopover from "@radix-ui/react-popover";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { PopoverContextProvider } from "../popover-context";

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
  /**
   * Specifies which type of events will trigger a popover to show
   */
  trigger?: "click" | "hover";
};

export function Popover({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  trigger = "click",
  ...props
}: PopoverProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open} {...props}>
      <PopoverContextProvider open={open} setOpen={setOpen} trigger={trigger}>
        {children}
      </PopoverContextProvider>
    </RadixPopover.Root>
  );
}

Popover.displayName = "@optiaxiom/react/Popover";
