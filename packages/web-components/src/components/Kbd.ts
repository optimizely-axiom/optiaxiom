import { Kbd as KbdComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Kbd = "ax-kbd";
export default register(Kbd, KbdComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Kbd]: ComponentAttributes<typeof KbdComponent>;
    }
  }
}
