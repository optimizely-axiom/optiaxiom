"use client";

import { createContext } from "@radix-ui/react-context";

export const [ProteusDocumentPathProvider, useProteusDocumentPathContext] =
  createContext<{
    path: string;
  }>("@optiaxiom/proteus/ProteusDocumentPath", {
    path: "",
  });
