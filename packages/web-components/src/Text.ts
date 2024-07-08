import { Text as TextComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Text = "ax-text";
register(Text, TextComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Text]: ComponentAttributes<typeof TextComponent>;
    }
  }
}
