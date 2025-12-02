import { useContext } from "react";

import { Dialog } from "../dialog";
import { DialogKitContext } from "../dialog-kit/internals";

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

/**
 * Display a modal with important content that expects confirmation from the
 * user.
 *
 * IMPORTANT: AlertDialog does NOT have a close (X) button in the header - users
 * must explicitly choose an action. This is intentional for confirmation
 * dialogs to prevent accidental dismissal of critical actions.
 *
 * Key differences from Dialog:
 * - No automatic close button (requires explicit user choice)
 * - AlertDialogCancel: Cancel/dismiss button (defaults to "Cancel" text)
 * - AlertDialogAction: Primary/destructive action button
 * - Use for: Confirmations, destructive actions, critical decisions
 * - DO NOT use for: General forms, informational content (use Dialog instead)
 *
 * Basic structure:
 * - AlertDialog: Root component for managing state
 * - AlertDialogTrigger: Button that opens the alert
 * - AlertDialogContent: Container with backdrop
 * - AlertDialogHeader: Title (no close button)
 * - AlertDialogBody: Warning/confirmation message
 * - AlertDialogFooter: Action buttons (Cancel + Action)
 *
 * For async operations, use event.preventDefault() in AlertDialogAction onClick
 * to prevent auto-close, then manually close after completion.
 *
 * @category overlay
 * @group AlertDialog
 * @since 0.1.0
 */
export function AlertDialog(props: AlertDialogProps) {
  if (useContext(DialogKitContext)) {
    throw new Error(
      "`@optiaxiom/react/AlertDialog` should not be used explicitly in managed mode." +
        "\n\n" +
        "Please remove it and only use `@optiaxiom/react/AlertDialogContent` instead.",
    );
  }

  return <Dialog {...props} />;
}

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
