import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

import { tokens, tokensDark } from "../tokens";
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

const createGlobalThemeContractOptimized = <T extends object>(
  tokens: T,
  mapFn: (value: null | string) => string,
  // @ts-expect-error -- preserve original token types
) => createGlobalThemeContract(tokens, mapFn) as unknown as T;

export const theme = createGlobalThemeContractOptimized(
  createThemeContractFromTokens(tokens, ""),
  (value) => `ax-${value}`,
);
// @ts-expect-error -- preserve original token types
createGlobalTheme(":root", theme, tokens);
// @ts-expect-error -- preserve original token types
createGlobalTheme(":root.dark", theme, tokensDark);
