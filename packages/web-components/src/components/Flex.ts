import { Flex as FlexComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Flex = "ax-flex";
export default register(Flex, FlexComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Flex]: ComponentAttributes<typeof FlexComponent>;
    }
  }
}
