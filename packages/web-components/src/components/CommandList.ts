import { CommandList as CommandListComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandList = "ax-command-list";
register(CommandList, CommandListComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandList]: ComponentAttributes<typeof CommandListComponent>;
    }
  }
}
