import { AvatarGroup as AvatarGroupComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AvatarGroup = "ax-avatar-group";
register(AvatarGroup, AvatarGroupComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AvatarGroup]: ComponentAttributes<typeof AvatarGroupComponent>;
    }
  }
}
