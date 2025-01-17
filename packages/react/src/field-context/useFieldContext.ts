"use client";

import { useContext } from "react";

import { FieldContext } from "./FieldContext";

export const useFieldContext = (overrides: { error?: boolean } = {}) => {
  return {
    ...(useContext(FieldContext) ?? {}),
    ...("error" in overrides &&
      typeof overrides.error !== "undefined" && { error: overrides.error }),
  };
};
