import { DialogTrigger as DialogTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DialogTrigger = "ax-dialog-trigger";
export default register(DialogTrigger, DialogTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DialogTrigger]: ComponentAttributes<typeof DialogTriggerComponent>;
    }
  }
}
