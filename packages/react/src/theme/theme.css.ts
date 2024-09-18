// eslint-disable-next-line local/no-global-styles
import { createGlobalThemeContract } from "@vanilla-extract/css";

import { tokens } from "../tokens";
import { mapValues } from "../utils";

const createThemeContractFromTokens = <
  T extends Record<string, unknown>,
  P extends string,
>(
  tokens: T,
  path: P,
): T => {
  return mapValues(tokens, (value, key) => {
    return value && typeof value === "object"
      ? createThemeContractFromTokens(value as T, `${path}${key}-`)
      : `${path}${key.toString().replaceAll(/[./]/g, "-")}`;
  }) as T;
};

export const theme = createGlobalThemeContract(
  createThemeContractFromTokens(tokens, ""),
  (value) => `ax-${value}`,
);
