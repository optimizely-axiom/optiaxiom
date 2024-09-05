import { AlertDialogFooter as AlertDialogFooterComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogFooter = "ax-alert-dialog-footer";
export default register(AlertDialogFooter, AlertDialogFooterComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogFooter]: ComponentAttributes<
        typeof AlertDialogFooterComponent
      >;
    }
  }
}
