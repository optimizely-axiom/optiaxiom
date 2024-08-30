import { Heading as HeadingComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Heading = "ax-heading";
export default register(Heading, HeadingComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Heading]: ComponentAttributes<typeof HeadingComponent>;
    }
  }
}
