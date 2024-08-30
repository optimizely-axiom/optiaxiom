import { PopoverContent as PopoverContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const PopoverContent = "ax-popover-content";
export default register(PopoverContent, PopoverContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [PopoverContent]: ComponentAttributes<typeof PopoverContentComponent>;
    }
  }
}
