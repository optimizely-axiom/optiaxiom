import { Checkbox as CheckboxComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Checkbox = "ax-checkbox";
export default register(Checkbox, CheckboxComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Checkbox]: ComponentAttributes<typeof CheckboxComponent>;
    }
  }
}
