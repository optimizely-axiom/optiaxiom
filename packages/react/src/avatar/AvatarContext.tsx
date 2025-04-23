import { Context } from "radix-ui/internal";
import { type ComponentPropsWithoutRef } from "react";

import type { Avatar } from "./Avatar";

export const [AvatarProvider, useAvatarContext] = Context.createContext<
  Pick<ComponentPropsWithoutRef<typeof Avatar>, "size">
>("@optiaxiom/react/Avatar", { size: undefined });
