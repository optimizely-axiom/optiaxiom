import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { AlertDialogContextProvider } from "../alert-dialog-context";
import {
  NestedDialogContextProvider,
  useNestedDialogCount,
} from "../nested-dialog-context";

type AlertDialogProps = {
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

export function AlertDialog({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: AlertDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const [isRootDialog, nestedDialogCount, setNestedDialogCount] =
    useNestedDialogCount("AlertDialog", open);

  return (
    <NestedDialogContextProvider onCountChange={setNestedDialogCount}>
      <RadixAlertDialog.Root onOpenChange={setOpen} open={open} {...props}>
        <AlertDialogContextProvider
          isRootDialog={isRootDialog}
          nestedDialogCount={nestedDialogCount}
          open={open}
        >
          {children}
        </AlertDialogContextProvider>
      </RadixAlertDialog.Root>
    </NestedDialogContextProvider>
  );
}

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
