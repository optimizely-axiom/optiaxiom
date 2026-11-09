"use client";

import type { MutableRefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [FocusBookmarkProviderProvider, useFocusBookmarkProviderContext] =
  createContext<{
    /**
     * This layer's own bookmarks, used when the shared registry is missing.
     */
    bookmarksRef: MutableRefObject<HTMLElement[]>;
    /**
     * Nesting depth for the next bookmark layer: 0 for the app root, one more
     * for each layer inside it.
     */
    depth: number;
  }>("@optiaxiom/react/FocusBookmarkProvider", {
    bookmarksRef: { current: [] },
    depth: 0,
  });
