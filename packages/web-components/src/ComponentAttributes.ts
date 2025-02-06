import type { RefAttributes } from "react";

export type ComponentAttributes<P> = KebabCaseKeys<P> &
  RefAttributes<HTMLElement>;

type KebabCase<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? KebabCase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

type KebabCaseKeys<T> = {
  [K in keyof T as K extends `on${string}`
    ? never
    : KebabCase<K & string>]: T[K];
};
