import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

import { tokens, tokensDark } from "../tokens";
import { mapValues } from "../utils";

type ThemeContract<Obj, Prefix extends string> = {
  [Prop in keyof Obj]: Obj[Prop] extends string
    ? Prop extends number | string
      ? `${Prefix}${ReplaceDot<Prop>}`
      : never
    : Obj[Prop] extends Record<number | string, unknown>
      ? ThemeContract<Obj[Prop], `${Prefix}${Prop & string}-`>
      : never;
};
type ReplaceDot<S extends number | string> =
  `${S}` extends `${infer L}${"." | "/"}${infer R}` ? `${L}-${R}` : S;
type Tokens = {
  [key: string]: Tokens | string;
};
const createThemeContractFromTokens = <T extends Tokens, P extends string>(
  tokens: T,
  path: P,
): ThemeContract<T, P> => {
  return mapValues(tokens, (value, key) => {
    return typeof value === "object"
      ? createThemeContractFromTokens(value, `${path}${key}-`)
      : `${path}${key.toString().replaceAll(/[./]/g, "-")}`;
  }) as ThemeContract<T, P>;
};

const createGlobalThemeContractOptimized = <T extends Tokens>(
  tokens: ThemeContract<T, "">,
  mapFn: (value: null | string) => string,
) => createGlobalThemeContract(tokens, mapFn) as unknown as T;

export const theme = createGlobalThemeContractOptimized(
  createThemeContractFromTokens(tokens, ""),
  (value) => `ax-${value}`,
);
// @ts-expect-error -- preserve original token types
createGlobalTheme(":root", theme, tokens);
// @ts-expect-error -- preserve original token types
createGlobalTheme(":root.dark", theme, tokensDark);
