import { DialogContent as DialogContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogContent = "ax-dialog-content";
export default register(DialogContent, DialogContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogContent]: ComponentAttributes<typeof DialogContentComponent>;
    }
  }
}
