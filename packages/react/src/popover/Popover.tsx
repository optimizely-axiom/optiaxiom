import * as RadixPopover from "@radix-ui/react-popover";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { type BoxProps } from "../box";
import { PopoverContextProvider } from "../popover-context";

type PopoverProps = BoxProps<typeof RadixPopover.Root>;

export const Popover = ({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: PopoverProps) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open} {...props}>
      <PopoverContextProvider open={open}>{children}</PopoverContextProvider>
    </RadixPopover.Root>
  );
};

Popover.displayName = "@optiaxiom/react/Popover";
