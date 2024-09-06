import { AlertDialogContent as AlertDialogContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogContent = "ax-alert-dialog-content";
export default register(AlertDialogContent, AlertDialogContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogContent]: ComponentAttributes<
        typeof AlertDialogContentComponent
      >;
    }
  }
}
