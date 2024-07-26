import { ToastTitle as ToastTitleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ToastTitle = "ax-toast-title";
register(ToastTitle, ToastTitleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ToastTitle]: ComponentAttributes<typeof ToastTitleComponent>;
    }
  }
}
