import { Combobox as ComboboxComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Combobox = "ax-combobox";
register(Combobox, ComboboxComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Combobox]: ComponentAttributes<typeof ComboboxComponent>;
    }
  }
}
