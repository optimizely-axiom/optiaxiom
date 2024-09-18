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

const createGlobalThemeContractInlineTypes = <T extends NullableTokens>(
  tokens: T,
  mapFn: (value: null | string) => string,
) =>
  createGlobalThemeContract(tokens, mapFn) as unknown as MapLeafNodes<
    T,
    CSSVarFunction
  >;

export const theme = createGlobalThemeContractInlineTypes(
  createThemeContractFromTokens(tokens, ""),
  (value) => `ax-${value}`,
);

type CSSVarFunction =
  | `var(--${string})`
  | `var(--${string}, ${number | string})`;
type Primitive = boolean | null | number | string | undefined;
export type MapLeafNodes<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Primitive
    ? LeafType
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Obj[Prop] extends Record<number | string, any>
      ? MapLeafNodes<Obj[Prop], LeafType>
      : never;
};
type NullableTokens = {
  [key: string]: NullableTokens | null | string;
};
