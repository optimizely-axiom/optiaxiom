import { AlertDescription as AlertDescriptionComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertDescription = "ax-alert-description";
export default register(AlertDescription, AlertDescriptionComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertDescription]: ComponentAttributes<typeof AlertDescriptionComponent>;
    }
  }
}
