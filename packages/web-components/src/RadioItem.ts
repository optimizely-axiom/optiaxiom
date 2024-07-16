import { RadioItem as RadioItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const RadioItem = "ax-radio-item";
register(RadioItem, RadioItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [RadioItem]: ComponentAttributes<typeof RadioItemComponent>;
    }
  }
}
