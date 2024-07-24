import { Toaster as ToasterComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Toaster = "ax-toaster";
register(Toaster, ToasterComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Toaster]: ComponentAttributes<typeof ToasterComponent>;
    }
  }
}
