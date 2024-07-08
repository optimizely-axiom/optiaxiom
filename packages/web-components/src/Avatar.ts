import { Avatar as AvatarComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Avatar = "ax-avatar";
register(Avatar, AvatarComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Avatar]: ComponentAttributes<typeof AvatarComponent>;
    }
  }
}
