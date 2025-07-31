import { createContext } from "react";

export const AxiomAuthContext = createContext<
  | undefined
  | {
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
    }
>(undefined);
export const AxiomVersionContext = createContext<string | undefined>(undefined);
