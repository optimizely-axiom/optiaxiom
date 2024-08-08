import { CommandSeparator as CommandSeparatorComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandSeparator = "ax-command-separator";
register(CommandSeparator, CommandSeparatorComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandSeparator]: ComponentAttributes<typeof CommandSeparatorComponent>;
    }
  }
}
