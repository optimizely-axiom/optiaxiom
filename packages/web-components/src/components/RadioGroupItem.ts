import { RadioGroupItem as RadioGroupItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const RadioGroupItem = "ax-radio-group-item";
register(RadioGroupItem, RadioGroupItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [RadioGroupItem]: ComponentAttributes<typeof RadioGroupItemComponent>;
    }
  }
}
