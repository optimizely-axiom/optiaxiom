import * as Components from "@optiaxiom/react";

import { exports } from "../package.json";

type AllComponents = Set<
  keyof {
    [Key in ComponentNames as `ax${KebabCase<Key>}`]: never;
  }
>;

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
    ("ax" +
      path
        .slice(2)
        .replace(
          /[A-Z]/g,
          (m) => "-" + m.toLowerCase(),
        )) as S extends `./${infer N}` ? `ax${KebabCase<N>}` : never,
);

export const components: AllComponents = new Set(exported);
