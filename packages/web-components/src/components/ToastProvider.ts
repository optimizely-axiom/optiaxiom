import { ToastProvider as ToastProviderComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ToastProvider = "ax-toast-provider";
export default register(ToastProvider, ToastProviderComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ToastProvider]: ComponentAttributes<typeof ToastProviderComponent>;
    }
  }
}
