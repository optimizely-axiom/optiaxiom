import { Dialog } from "../dialog";

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

export function AlertDialog(props: AlertDialogProps) {
  return <Dialog {...props} />;
}

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
