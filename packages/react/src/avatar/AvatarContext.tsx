import { createContext } from "@radix-ui/react-context";
import { type ComponentPropsWithoutRef } from "react";

import type { Avatar } from "./Avatar";

export const [AvatarProvider, useAvatarContext] = createContext<
  Pick<ComponentPropsWithoutRef<typeof Avatar>, "size">
>("@optiaxiom/react/Avatar", { size: undefined });
