import * as Components from "@optiaxiom/react";

import type { KebabCase } from "./components/ComponentAttributes";

import { exports } from "../package.json";

type ComponentNames = Exclude<
  keyof {
    [Key in keyof typeof Components as Key extends `${infer C}${string}`
      ? C extends Uppercase<C>
        ? Key
        : never
      : never]: never;
  },
  "FieldContext"
>;

type AllComponents = {
  [Key in ComponentNames as `ax${KebabCase<Key>}`]: Key;
};

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
