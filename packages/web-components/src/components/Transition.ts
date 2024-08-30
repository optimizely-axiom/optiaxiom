import { Transition as TransitionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Transition = "ax-transition";
export default register(Transition, TransitionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Transition]: ComponentAttributes<typeof TransitionComponent>;
    }
  }
}
