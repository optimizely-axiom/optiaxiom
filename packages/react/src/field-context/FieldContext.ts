import { createContext } from "react";

export const FieldContext = createContext<
  | {
      error: boolean;
      id: string | undefined;
      labelId: string | undefined;
      required: boolean | undefined;
    }
  | undefined
>(undefined);
