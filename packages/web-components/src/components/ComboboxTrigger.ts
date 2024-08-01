import { ComboboxTrigger as ComboboxTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ComboboxTrigger = "ax-combobox-trigger";
register(ComboboxTrigger, ComboboxTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ComboboxTrigger]: ComponentAttributes<typeof ComboboxTriggerComponent>;
    }
  }
}
