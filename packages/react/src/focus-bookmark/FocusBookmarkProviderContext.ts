"use client";

import type { MutableRefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [FocusBookmarkProviderProvider, useFocusBookmarkProviderContext] =
  createContext<{
    bookmarksRef: MutableRefObject<HTMLElement[]>;
  }>("@optiaxiom/react/FocusBookmarkProvider");
