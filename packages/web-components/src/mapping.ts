import * as Components from "@optiaxiom/react";

import { exports } from "../package.json";

type AllComponents = {
  [Key in ComponentNames as `ax${KebabCase<Key>}`]: Key;
};

type ComponentNames = Exclude<
  keyof {
    [Key in keyof typeof Components as Key extends `${infer C}${string}`
      ? C extends Uppercase<C>
        ? Key
        : never
      : never]: never;
  },
  | "FieldContext"
  | "ModalContextProvider"
  | "ToastProvider"
  | "TooltipProvider"
  | "TransitionGlobalConfig"
>;

type KebabCase<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? KebabCase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

const exported = (
  Object.keys(exports).filter((n) => n !== ".") as Array<
    Exclude<keyof typeof exports, ".">
  >
).map(
  <S extends string>(path: S) =>
    [
      "ax" + path.slice(2).replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
      path.slice(2),
    ] as S extends `./${infer N}` ? [`ax${KebabCase<N>}`, N] : never,
);

export const mapping: AllComponents = Object.fromEntries(exported) as {
  [T in (typeof exported)[number] as T[0]]: T[1];
};

export const formAssociated: Set<string> = new Set([
  "ax-checkbox",
  "ax-input",
  "ax-radio",
  "ax-search-input",
  "ax-switch",
  "ax-textarea",
]) satisfies Set<keyof AllComponents>;
