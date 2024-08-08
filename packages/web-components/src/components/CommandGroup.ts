import { CommandGroup as CommandGroupComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandGroup = "ax-command-group";
register(CommandGroup, CommandGroupComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandGroup]: ComponentAttributes<typeof CommandGroupComponent>;
    }
  }
}
