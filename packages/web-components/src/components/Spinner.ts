import { Spinner as SpinnerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Spinner = "ax-spinner";
export default register(Spinner, SpinnerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Spinner]: ComponentAttributes<typeof SpinnerComponent>;
    }
  }
}
