import { CommandItem as CommandItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const CommandItem = "ax-CommandItem";
register(CommandItem, CommandItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CommandItem]: ComponentAttributes<typeof CommandItemComponent>;
    }
  }
}
