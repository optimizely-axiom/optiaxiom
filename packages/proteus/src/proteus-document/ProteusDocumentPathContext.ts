"use client";

import { createContext } from "@radix-ui/react-context";

export const [ProteusDocumentPathProvider, useProteusDocumentPathContext] =
  createContext<{
    mapIndices: number[];
    path: string;
  }>("@optiaxiom/proteus/ProteusDocumentPath", {
    mapIndices: [],
    path: "",
  });
