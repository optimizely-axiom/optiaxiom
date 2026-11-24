import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [HoverCardContextProvider, useHoverCardContext] = createContext<{
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/HoverCardContext");

/**
 * Lets a component that renders consumer content, such as a Tree item,
 * position hover cards inside it against a larger element than their trigger.
 */
export const [HoverCardAnchorProvider, useHoverCardAnchorContext] =
  createContext<{
    anchorRef?: RefObject<HTMLElement>;
  }>("@optiaxiom/react/HoverCardAnchor", {});
