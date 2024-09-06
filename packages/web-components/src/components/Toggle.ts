import { Toggle as ToggleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Toggle = "ax-toggle";
export default register(Toggle, ToggleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Toggle]: ComponentAttributes<typeof ToggleComponent>;
    }
  }
}
