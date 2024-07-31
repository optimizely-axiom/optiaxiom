import { MenuSeparator as MenuSeparatorComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const MenuSeparator = "ax-menu-separator";
register(MenuSeparator, MenuSeparatorComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [MenuSeparator]: ComponentAttributes<typeof MenuSeparatorComponent>;
    }
  }
}
