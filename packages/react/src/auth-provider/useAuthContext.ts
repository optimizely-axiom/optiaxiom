"use client";

import { AxiomAuthContext } from "@optiaxiom/globals";
import { useContext } from "react";

export function useAuthContext() {
  return useContext(AxiomAuthContext);
}
