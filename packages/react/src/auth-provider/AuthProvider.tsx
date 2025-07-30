import { AxiomAuthContext } from "@optiaxiom/globals";
import { type ReactNode, useMemo } from "react";

import { useEffectEvent } from "../hooks";

export type AuthProviderProps = {
  children?: ReactNode;
  /**
   * The ID of the instance the user is currently accessing.
   */
  instance: string | undefined;
  /**
   * Callback to refresh and return a new auth token in case it becomes stale.
   */
  refresh: () => Promise<string>;
  /**
   * The auth token of the current user session.
   */
  token: string | undefined;
};

export function AuthProvider({
  children,
  instance,
  refresh: refreshProp,
  token,
}: AuthProviderProps) {
  const refresh = useEffectEvent(refreshProp);

  return (
    <AxiomAuthContext.Provider
      value={useMemo(
        () => ({ instance, refresh, token }),
        [instance, refresh, token],
      )}
    >
      {children}
    </AxiomAuthContext.Provider>
  );
}

AuthProvider.displayName = "@optiaxiom/react/AuthProvider";
