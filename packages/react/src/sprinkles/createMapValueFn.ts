import type { ConditionOptions, ResponsiveValue } from "./types";

type ExtractValue<Property> =
  Property extends ReadonlyArray<unknown>
    ? NonNullable<Property[number]>
    : Property extends Array<unknown>
      ? NonNullable<Property[number]>
      : Property extends Record<string, unknown>
        ? NonNullable<Property[keyof Property]>
        : Property;

export const createMapValueFn =
  <SprinklesProperties extends ConditionOptions>(config: SprinklesProperties) =>
  <
    OutputValue extends boolean | null | number | string | undefined,
    Value extends ResponsiveValue<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      SprinklesProperties["conditions"]["responsiveArray"][number],
      SprinklesProperties["conditions"]["responsiveArray"]["length"]
    >,
  >(
    value: Value,
    fn: (
      inputValue: ExtractValue<Value>,
      key: SprinklesProperties["conditions"]["responsiveArray"][number],
    ) => OutputValue,
  ): Value extends boolean | number | string
    ? OutputValue
    : Partial<
        Record<
          SprinklesProperties["conditions"]["responsiveArray"][number],
          OutputValue
        >
      > =>
    Object.fromEntries(
      (Array.isArray(value)
        ? value.map((v, i) => [config.conditions.responsiveArray[i], v])
        : value && typeof value === "object"
          ? Object.entries(value)
          : [["base", value]]
      ).map(([condition, value]) => [
        condition,
        value ? fn(value, condition) : value,
      ]),
    );
