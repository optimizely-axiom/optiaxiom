import { DialogTitle as DialogTitleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogTitle = "ax-dialog-title";
register(DialogTitle, DialogTitleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogTitle]: ComponentAttributes<typeof DialogTitleComponent>;
    }
  }
}
