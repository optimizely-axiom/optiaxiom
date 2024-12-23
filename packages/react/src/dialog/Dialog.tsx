import * as RadixDialog from "@radix-ui/react-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { DialogContextProvider } from "../dialog-context";

type DialogProps = {
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

export function Dialog({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixDialog.Root onOpenChange={setOpen} open={open} {...props}>
      <DialogContextProvider open={open}>{children}</DialogContextProvider>
    </RadixDialog.Root>
  );
}

Dialog.displayName = "@optiaxiom/react/Dialog";
