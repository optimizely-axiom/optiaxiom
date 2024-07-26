import { Code as CodeComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Code = "ax-code";
register(Code, CodeComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Code]: ComponentAttributes<typeof CodeComponent>;
    }
  }
}
