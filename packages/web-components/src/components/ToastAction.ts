import { ToastAction as ToastActionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ToastAction = "ax-toast-action";
export default register(ToastAction, ToastActionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ToastAction]: ComponentAttributes<typeof ToastActionComponent>;
    }
  }
}
