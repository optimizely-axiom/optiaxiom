import { Dialog as DialogComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Dialog = "ax-dialog";
register(Dialog, DialogComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Dialog]: ComponentAttributes<typeof DialogComponent>;
    }
  }
}
