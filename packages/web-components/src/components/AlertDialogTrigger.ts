import { AlertDialogTrigger as AlertDialogTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogTrigger = "ax-alert-dialog-trigger";
export default register(AlertDialogTrigger, AlertDialogTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogTrigger]: ComponentAttributes<
        typeof AlertDialogTriggerComponent
      >;
    }
  }
}
