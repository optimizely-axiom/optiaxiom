import { DialogClose as DialogCloseComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogClose = "ax-dialog-close";
export default register(DialogClose, DialogCloseComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogClose]: ComponentAttributes<typeof DialogCloseComponent>;
    }
  }
}
