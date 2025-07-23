"use client";

import { createContext } from "@radix-ui/react-context";

export const [DetailsPanelProvider, useDetailsPanelContext] = createContext<{
  descriptionId: string;
  labelId: string;
}>("@optiaxiom/react/DetailsPanel");
