"use client";

import { createContext } from "react";

export const FieldContext = createContext<
  | undefined
  | {
      descriptionId: string | undefined;
      error: boolean;
      errorId: string | undefined;
      inputId: string | undefined;
      labelId: string | undefined;
    }
>(undefined);
