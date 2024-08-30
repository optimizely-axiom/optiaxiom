import { type ComponentPropsWithoutRef, createContext } from "react";

import type { Avatar } from "../avatar";

export const AvatarContext = createContext<{
  size: ComponentPropsWithoutRef<typeof Avatar>["size"] | undefined;
}>({
  size: undefined,
});
