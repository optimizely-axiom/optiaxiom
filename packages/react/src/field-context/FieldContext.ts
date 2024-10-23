import { createContext } from "react";

export const FieldContext = createContext<
  | {
      descriptionId: string | undefined;
      error: boolean;
      errorId: string | undefined;
      id: string | undefined;
      labelId: string | undefined;
      required: boolean | undefined;
    }
  | undefined
>(undefined);
