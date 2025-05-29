import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";

import { FocusBookmarkRestore } from "../focus-bookmark";
import {
  NestedDialogProvider,
  useNestedDialogCount,
} from "../nested-dialog-context";
import { AlertDialogProvider } from "./AlertDialogContext";

export type AlertDialogProps = {
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
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: AlertDialogProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/AlertDialog",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [presence, setPresence] = useState<boolean>(false);

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
          <RadixAlertDialog.Trigger asChild>
            <FocusBookmarkRestore />
          </RadixAlertDialog.Trigger>
          {children}
        </AlertDialogProvider>
      </RadixAlertDialog.Root>
    </NestedDialogProvider>
  );
}

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
