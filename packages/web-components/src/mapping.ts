import * as Components from "@optiaxiom/react";

import { exports } from "../package.json";

type AllComponents = {
  [Key in ComponentNames as `ax${KebabCase<Key>}`]: true;
};

type ComponentNames = Exclude<
  keyof {
    [Key in keyof typeof Components as Key extends `${infer C}${string}`
      ? C extends Uppercase<C>
        ? Key
        : never
      : never]: never;
  },
  "FieldContext" | "TransitionGlobalConfig"
>;

type KebabCase<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? KebabCase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

type WebComponents = {
  [Key in Exclude<keyof typeof exports, "."> extends `./${infer S}`
    ? `ax${KebabCase<S>}`
    : never]: true;
};

const exported = Object.fromEntries(
  Object.keys(exports)
    .filter((n) => n !== ".")
    .map((path) => [
      "ax" + path.slice(2).replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
      true,
    ]),
) as WebComponents;

export const components: AllComponents = exported;
export const exported_check: WebComponents = components;
