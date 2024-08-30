import { Field as FieldComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Field = "ax-field";
export default register(Field, FieldComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Field]: ComponentAttributes<typeof FieldComponent>;
    }
  }
}
