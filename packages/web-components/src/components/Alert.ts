import { Alert as AlertComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Alert = "ax-alert";
export default register(Alert, AlertComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Alert]: ComponentAttributes<typeof AlertComponent>;
    }
  }
}
