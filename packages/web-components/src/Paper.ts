import { Paper as PaperComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Paper = "ax-paper";
register(Paper, PaperComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Paper]: ComponentAttributes<typeof PaperComponent>;
    }
  }
}
