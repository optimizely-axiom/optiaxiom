import { Toast as ToastComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Toast = "ax-toast";
register(Toast, ToastComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Toast]: ComponentAttributes<typeof ToastComponent>;
    }
  }
}
