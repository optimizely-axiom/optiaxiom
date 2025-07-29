import { createContext } from "react";

export const AxiomAuthContext = createContext<
  | undefined
  | {
      /**
       * The ID of the instance the user is currently accessing.
       */
      instance: string;
      /**
       * The auth token of the current user session.
       */
      token: string;
    }
>(undefined);
export const AxiomVersionContext = createContext<string | undefined>(undefined);
