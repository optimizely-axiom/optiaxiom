import type { CSSProperties, StyleRule } from "@vanilla-extract/css";

export interface ResponsiveArray<Length extends number, Value>
  extends ReadonlyArray<Value> {
  0: Value;
  length: Length;
}
type ResponsiveArrayByMaxLength<MaxLength extends number, Value> = [
  never,
  ResponsiveArray<1, Value | null>,
  ResponsiveArray<1 | 2, Value | null>,
  ResponsiveArray<1 | 2 | 3, Value | null>,
  ResponsiveArray<1 | 2 | 3 | 4, Value | null>,
  ResponsiveArray<1 | 2 | 3 | 4 | 5, Value | null>,
  ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6, Value | null>,
  ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7, Value | null>,
  ResponsiveArray<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, Value | null>,
][MaxLength];

export type ResponsiveValue<
  T,
  ConditionNames extends string,
  ResponsiveLength extends number,
> =
  | {
      [Condition in ConditionNames]?: Values<T>;
    }
  | ResponsiveArrayByMaxLength<ResponsiveLength, Values<T>>
  | Values<T>
  | undefined;

type AtomicCSSProperties = {
  [Property in keyof CSSProperties]?:
    | ReadonlyArray<CSSProperties[Property]>
    | Record<string, CSSProperties[Property] | Omit<StyleRule, ConditionKey>>;
};
type AtomicCustomProperties = Record<
  string,
  Record<number | string, Omit<StyleRule, ConditionKey>>
>;
export type AtomicProperties = AtomicCSSProperties | AtomicCustomProperties;

export type Values<Property> =
  Property extends ReadonlyArray<unknown>
    ? Property[number]
    : Property extends Array<unknown>
      ? Property[number]
      : keyof Property;
export type AtomicStyle<M = string, V = unknown> = {
  mappings: M[];
  values: V;
};
export type AtomicStyles<Properties> = {
  styles: {
    [Property in keyof Properties]: AtomicStyle<Property, Properties[Property]>;
  };
};
export type ShorthandStyle<M = string[]> = {
  mappings: M;
};
export type ShorthandStyles<Shorthands extends Record<string, PropertyKey[]>> =
  {
    styles: {
      [Property in keyof Shorthands]: ShorthandStyle<Shorthands[Property]>;
    };
  };

type ConditionKey = "@media";
type Condition = Partial<Record<ConditionKey, string>>;
type BaseConditions = {
  [conditionName: string]: Condition;
};
export type ConditionProperties<
  Conditions extends BaseConditions = BaseConditions,
  ResponsiveLength extends number = number,
> = {
  conditions: Conditions;
  defaultCondition: keyof Conditions;
  responsiveArray: ResponsiveArray<ResponsiveLength, keyof Conditions>;
};

export type ConditionOptions<
  Conditions extends ConditionProperties = ConditionProperties,
> = {
  conditions: {
    defaultCondition: Conditions["defaultCondition"];
    responsiveArray: {
      length: Conditions["responsiveArray"]["length"];
    } & Array<keyof Conditions["conditions"] & string>;
  };
};

export type ModifierOptions<Modifiers = Record<string, never>> = {
  modifiers: Array<keyof Modifiers>;
};
