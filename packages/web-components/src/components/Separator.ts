import { Separator as SeparatorComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Separator = "ax-separator";
register(Separator, SeparatorComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Separator]: ComponentAttributes<typeof SeparatorComponent>;
    }
  }
}
