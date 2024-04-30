import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

import { mapValues } from "../utils";
import { tokensDark, tokensLight } from "./tokens";

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

export const theme = createGlobalThemeContract(
  createThemeContractFromTokens(tokensLight, ""),
  (value) => `ax-${value}`,
);
createGlobalTheme(":root", theme, tokensLight);
createGlobalTheme(":root.dark", theme, tokensDark);
