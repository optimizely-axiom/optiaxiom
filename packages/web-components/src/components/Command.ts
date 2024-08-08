import { Command as CommandComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Command = "ax-command";
register(Command, CommandComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Command]: ComponentAttributes<typeof CommandComponent>;
    }
  }
}
