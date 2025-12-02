import { AxiomAuthContext } from "@optiaxiom/globals";
import { type ReactNode, useMemo } from "react";

import { useEffectEvent } from "../hooks";

export type AuthProviderProps = {
  children?: ReactNode;
  /**
   * The ID of the instance the user is currently accessing.
   */
  instance: string;
  /**
   * Callback to refresh and return a new auth token in case it becomes stale.
   */
  refresh: () => Promise<string>;
  /**
   * The auth token of the current user session.
   */
  token: string;
};

/**
 * `AuthProvider` is used to pass down the user credentials to all components. It should be rendered near the root of your application and should be used only once.
 *
 * @category provider
 * @since 1.6.2
 */
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
