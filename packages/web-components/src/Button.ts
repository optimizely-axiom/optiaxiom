import { Button as ButtonComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Button = "ax-button";
register(Button, ButtonComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Button]: ComponentAttributes<typeof ButtonComponent>;
    }
  }
}
