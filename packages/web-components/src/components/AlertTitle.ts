import { AlertTitle as AlertTitleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AlertTitle = "ax-alert-title";
export default register(AlertTitle, AlertTitleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AlertTitle]: ComponentAttributes<typeof AlertTitleComponent>;
    }
  }
}
