import { Grid as GridComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Grid = "ax-grid";
export default register(Grid, GridComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Grid]: ComponentAttributes<typeof GridComponent>;
    }
  }
}
