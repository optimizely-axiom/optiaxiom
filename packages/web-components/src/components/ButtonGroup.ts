import { ButtonGroup as ButtonGroupComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ButtonGroup = "ax-button-group";
register(ButtonGroup, ButtonGroupComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ButtonGroup]: ComponentAttributes<typeof ButtonGroupComponent>;
    }
  }
}
