import { DialogDescription as DialogDescriptionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogDescription = "ax-dialog-description";
export default register(DialogDescription, DialogDescriptionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogDescription]: ComponentAttributes<
        typeof DialogDescriptionComponent
      >;
    }
  }
}
