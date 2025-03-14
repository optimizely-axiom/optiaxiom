import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";

import { AlertDialogProvider } from "../alert-dialog-context";
import {
  NestedDialogProvider,
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
  const [presence, setPresence] = useState<boolean>();

  const [nestedDialogCount, setNestedDialogCount] = useNestedDialogCount(
    "AlertDialog",
    open,
  );

  return (
    <NestedDialogProvider onCountChange={setNestedDialogCount}>
      <RadixAlertDialog.Root
        onOpenChange={setOpen}
        open={open || presence}
        {...props}
      >
        <AlertDialogProvider
          nestedDialogCount={nestedDialogCount}
          open={open}
          presence={presence}
          setPresence={setPresence}
        >
          {children}
        </AlertDialogProvider>
      </RadixAlertDialog.Root>
    </NestedDialogProvider>
  );
}

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
