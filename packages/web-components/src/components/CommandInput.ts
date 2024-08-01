import { CommandInput as CommandInputComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandInput = "ax-command-input";
register(CommandInput, CommandInputComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandInput]: ComponentAttributes<typeof CommandInputComponent>;
    }
  }
}