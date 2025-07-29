import { AxiomAuthContext } from "@optiaxiom/globals";
import { type ReactNode, useMemo } from "react";

export type AuthProviderProps = {
  children?: ReactNode;
  /**
   * The ID of the instance the user is currently accessing.
   */
  instance: string;
  /**
   * The auth token of the current user session.
   */
  token: string;
};

export function AuthProvider({ children, instance, token }: AuthProviderProps) {
  return (
    <AxiomAuthContext.Provider
      value={useMemo(() => ({ instance, token }), [instance, token])}
    >
      {children}
    </AxiomAuthContext.Provider>
  );
}

AuthProvider.displayName = "@optiaxiom/react/AuthProvider";
