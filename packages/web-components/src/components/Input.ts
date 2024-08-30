import { Input as InputComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Input = "ax-input";
export default register(Input, InputComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Input]: ComponentAttributes<typeof InputComponent>;
    }
  }
}
