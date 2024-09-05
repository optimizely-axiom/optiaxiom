import { AlertDialogAction as AlertDialogActionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogAction = "ax-alert-dialog-action";
export default register(AlertDialogAction, AlertDialogActionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogAction]: ComponentAttributes<
        typeof AlertDialogActionComponent
      >;
    }
  }
}
