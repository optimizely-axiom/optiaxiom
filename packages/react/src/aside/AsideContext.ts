"use client";

import { createContext } from "@radix-ui/react-context";

export const [AsideProvider, useAsideContext] = createContext<{
  descriptionId: string;
  labelId: string;
}>("@optiaxiom/react/Aside");
