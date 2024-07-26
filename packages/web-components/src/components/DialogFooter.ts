import { DialogFooter as DialogFooterComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogFooter = "ax-dialog-footer";
register(DialogFooter, DialogFooterComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogFooter]: ComponentAttributes<typeof DialogFooterComponent>;
    }
  }
}
