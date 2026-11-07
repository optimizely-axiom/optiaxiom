"use client";

import {
  createContext,
  createElement,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useMemo,
} from "react";

type FocusBookmarkProviderContextValue = {
  bookmarksRef: MutableRefObject<HTMLElement[]>;
};

const FocusBookmarkProviderContext = createContext<
  FocusBookmarkProviderContextValue | undefined
>(undefined);
FocusBookmarkProviderContext.displayName =
  "@optiaxiom/react/FocusBookmarkProviderContext";

export function FocusBookmarkProviderProvider({
  bookmarksRef,
  children,
}: FocusBookmarkProviderContextValue & { children?: ReactNode }) {
  const value = useMemo(() => ({ bookmarksRef }), [bookmarksRef]);
  return createElement(
    FocusBookmarkProviderContext.Provider,
    { value },
    children,
  );
}

FocusBookmarkProviderProvider.displayName =
  "@optiaxiom/react/FocusBookmarkProviderProvider";

/**
 * Consumers only ever render `AxiomProvider`, so a missing value names it, with
 * a hint for a host and remote that bundle separate copies of the library.
 */
export function useFocusBookmarkProviderContext(consumerName: string) {
  const value = useContext(FocusBookmarkProviderContext);
  if (!value) {
    throw new Error(
      `\`${consumerName}\` must be used within \`AxiomProvider\`. Wrap your app (and any separate React root) in \`AxiomProvider\`. If you already do, check for duplicate copies of \`@optiaxiom/react\`.`,
    );
  }
  return value;
}
