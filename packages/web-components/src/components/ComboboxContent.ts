import { ComboboxContent as ComboboxContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const ComboboxContent = "ax-combobox-content";
register(ComboboxContent, ComboboxContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [ComboboxContent]: ComponentAttributes<typeof ComboboxContentComponent>;
    }
  }
}
