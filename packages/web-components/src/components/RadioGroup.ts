import { RadioGroup as RadioGroupComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const RadioGroup = "ax-radio-group";
register(RadioGroup, RadioGroupComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [RadioGroup]: ComponentAttributes<typeof RadioGroupComponent>;
    }
  }
}
