import type {
  ComponentPropsWithoutRef,
  ElementType,
  RefAttributes,
} from "react";

type KebabCaseKeys<T> = {
  [K in keyof T as K extends `on${string}`
    ? never
    : KebabCase<K & string>]: T[K];
};
type KebabCase<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? KebabCase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

export type ComponentAttributes<C extends ElementType> = KebabCaseKeys<
  ComponentPropsWithoutRef<C>
> &
  RefAttributes<HTMLElement>;
