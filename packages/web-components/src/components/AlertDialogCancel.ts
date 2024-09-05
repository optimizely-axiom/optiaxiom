import { AlertDialogCancel as AlertDialogCancelComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogCancel = "ax-alert-dialog-cancel";
export default register(AlertDialogCancel, AlertDialogCancelComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogCancel]: ComponentAttributes<
        typeof AlertDialogCancelComponent
      >;
    }
  }
}
