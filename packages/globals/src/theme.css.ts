import { createGlobalThemeContract } from "@vanilla-extract/css";

import { tokens } from "./tokens";

const createThemeContractFromTokens = <
  T extends Record<string, unknown>,
  P extends string,
>(
  tokens: T,
  path: P,
): T => {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => {
      return [
        key,
        value && typeof value === "object"
          ? createThemeContractFromTokens(value as T, `${path}${key}-`)
          : `${path}${key.toString().replaceAll(/[./]/g, "-")}`,
      ];
    }),
  ) as T;
};

export const theme = createGlobalThemeContract(
  createThemeContractFromTokens(tokens, ""),
  (value) => `ax-${value}`,
);
