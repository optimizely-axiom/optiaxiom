import { Textarea as TextareaComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Textarea = "ax-textarea";
register(Textarea, TextareaComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Textarea]: ComponentAttributes<typeof TextareaComponent>;
    }
  }
}
