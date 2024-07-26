import { DialogBody as DialogBodyComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogBody = "ax-dialog-body";
register(DialogBody, DialogBodyComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogBody]: ComponentAttributes<typeof DialogBodyComponent>;
    }
  }
}
