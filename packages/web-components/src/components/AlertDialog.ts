import { AlertDialog as AlertDialogComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialog = "ax-alert-dialog";
register(AlertDialog, AlertDialogComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialog]: ComponentAttributes<typeof AlertDialogComponent>;
    }
  }
}
