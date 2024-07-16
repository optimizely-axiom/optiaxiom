import { Link as LinkComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Link = "ax-link";
register(Link, LinkComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Link]: ComponentAttributes<typeof LinkComponent>;
    }
  }
}
