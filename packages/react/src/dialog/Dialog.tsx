import * as RadixDialog from "@radix-ui/react-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useRef, useState } from "react";

import { FocusBookmarkRestore } from "../focus-bookmark";
import {
  NestedDialogProvider,
  useNestedDialogCount,
} from "../nested-dialog-context";
import { DialogProvider } from "./DialogContext";

export type DialogProps = {
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
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/Dialog",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [presence, setPresence] = useState<boolean>(false);

  const [nestedDialogCount, setNestedDialogCount] = useNestedDialogCount(
    "Dialog",
    open,
  );

  const cancelRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <NestedDialogProvider onCountChange={setNestedDialogCount}>
      <RadixDialog.Root
        onOpenChange={setOpen}
        open={open || presence}
        {...props}
      >
        <DialogProvider
          cancelRef={cancelRef}
          footerRef={footerRef}
          headerRef={headerRef}
          nestedDialogCount={nestedDialogCount}
          open={open}
          presence={presence}
          setPresence={setPresence}
        >
          <RadixDialog.Trigger asChild>
            <FocusBookmarkRestore />
          </RadixDialog.Trigger>
          {children}
        </DialogProvider>
      </RadixDialog.Root>
    </NestedDialogProvider>
  );
}

Dialog.displayName = "@optiaxiom/react/Dialog";
