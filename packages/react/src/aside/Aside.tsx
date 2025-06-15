import * as RadixDialog from "@radix-ui/react-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { FocusBookmarkRestore } from "../focus-bookmark";
import {
  NestedDialogProvider,
  useNestedDialogCount,
} from "../nested-dialog-context";
import { AsideProvider } from "./AsideContext";

export type AsideProps = {
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

export function Aside({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  ...props
}: AsideProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/Aside",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const [nestedDialogCount, setNestedDialogCount] = useNestedDialogCount(
    "Dialog",
    open,
  );

  return (
    <NestedDialogProvider onCountChange={setNestedDialogCount}>
      <RadixDialog.Root onOpenChange={setOpen} open={open} {...props}>
        <AsideProvider nestedDialogCount={nestedDialogCount} open={open}>
          <RadixDialog.Trigger asChild>
            <FocusBookmarkRestore />
          </RadixDialog.Trigger>
          {children}
        </AsideProvider>
      </RadixDialog.Root>
    </NestedDialogProvider>
  );
}

Aside.displayName = "@optiaxiom/react/Aside";
