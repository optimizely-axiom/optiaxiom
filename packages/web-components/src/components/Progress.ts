import { Progress as ProgressComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Progress = "ax-progress";
export default register(Progress, ProgressComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Progress]: ComponentAttributes<typeof ProgressComponent>;
    }
  }
}
