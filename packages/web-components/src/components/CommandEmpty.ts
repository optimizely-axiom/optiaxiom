import { CommandEmpty as CommandEmptyComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandEmpty = "ax-command-empty";
register(CommandEmpty, CommandEmptyComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandEmpty]: ComponentAttributes<typeof CommandEmptyComponent>;
    }
  }
}
