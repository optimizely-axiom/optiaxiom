import { type ComponentPropsWithoutRef, createContext } from "react";

import type { Avatar } from "../avatar";

type AvatarContextType = {
  size: ComponentPropsWithoutRef<typeof Avatar>["size"];
};

export const AvatarContext = createContext<{
  size: AvatarContextType["size"] | undefined;
}>({
  size: undefined,
});
