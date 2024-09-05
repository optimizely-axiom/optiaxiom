import { AlertDialogDescription as AlertDialogDescriptionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDialogDescription = "ax-alert-dialog-description";
export default register(
  AlertDialogDescription,
  AlertDialogDescriptionComponent,
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDialogDescription]: ComponentAttributes<
        typeof AlertDialogDescriptionComponent
      >;
    }
  }
}
