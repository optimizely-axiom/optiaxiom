import { AlertDialogTitle as AlertDialogTitleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogTitle = "ax-alert-dialog-title";
export default register(AlertDialogTitle, AlertDialogTitleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogTitle]: ComponentAttributes<typeof AlertDialogTitleComponent>;
    }
  }
}
