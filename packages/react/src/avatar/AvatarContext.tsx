import { type ComponentPropsWithoutRef, createContext } from "react";

import type { Avatar } from "./Avatar";

export const AvatarContext = createContext<{
  size: ComponentPropsWithoutRef<typeof Avatar>["size"] | undefined;
}>({
  size: undefined,
});
