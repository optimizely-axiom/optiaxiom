import type {
  AtomicStyle,
  ConditionOptions,
  ModifierOptions,
  ResponsiveValue,
  ShorthandStyle,
  Values,
} from "./types";

import {
  type Ident,
  escapeVar,
  generateIdentifier,
} from "./generateIdentifier";

type SprinklesProperties = {
  styleValues: Array<Record<string, unknown>>;
  styles: {
    [property: string]: AtomicStyle | ShorthandStyle;
  };
} & Partial<ConditionOptions> &
  Partial<ModifierOptions>;

type InferSprinklePropValue<
  Sprinkles extends SprinklesProperties,
  Prop extends keyof Sprinkles["styles"],
> = Sprinkles["styles"][Prop] extends AtomicStyle
  ? Sprinkles["conditions"] extends NonNullable<
      SprinklesProperties["conditions"]
    >
    ? ResponsiveValue<
        Sprinkles["styles"][Prop]["values"],
        Sprinkles["conditions"]["responsiveArray"][number],
        Sprinkles["conditions"]["responsiveArray"]["length"]
      >
    : Values<Sprinkles["styles"][Prop]["values"]>
  : Sprinkles["styles"][Prop] extends ShorthandStyle
    ? InferSprinklePropValue<
        Sprinkles,
        Sprinkles["styles"][Prop]["mappings"][number]
      >
    : never;
type InferSprinkleProps<Sprinkles extends SprinklesProperties> = {
  [Prop in keyof Sprinkles["styles"]]?: InferSprinklePropValue<Sprinkles, Prop>;
};
type SprinkleStates<Args extends ReadonlyArray<unknown>> = Args extends [
  infer L,
  ...infer R,
]
  ? (L extends SprinklesProperties
      ? L["modifiers"] extends NonNullable<SprinklesProperties["modifiers"]>
        ? Partial<Record<L["modifiers"][number], InferSprinkleProps<L>>>
        : unknown
      : never) &
      SprinkleStates<R>
  : unknown;
type SprinkleProps<Args extends ReadonlyArray<unknown>> = Args extends [
  infer L,
  ...infer R,
]
  ? (L extends SprinklesProperties ? InferSprinkleProps<L> : never) &
      SprinkleProps<R>
  : unknown;

const baseModifier = ":";

export const createSprinkles = <
  Args extends ReadonlyArray<SprinklesProperties>,
>(
  ...configs: Args
) => {
  const properties = new Set(
    configs.flatMap((config) => Object.keys(config.styles)),
  ) as Set<keyof SprinkleProps<Args>>;
  const mapPropertyToConfig: Record<string, SprinklesProperties> = {};
  for (const config of configs) {
    for (const property in config.styles) {
      mapPropertyToConfig[property] = config;
    }
  }

  return Object.assign(
    (props: SprinkleProps<Args> & SprinkleStates<Args>) => {
      const normalizedProps = { [baseModifier]: {} } as unknown as Record<
        string,
        SprinkleProps<Args>
      >;
      for (const name in props as Record<string, unknown>) {
        if (name.startsWith(baseModifier)) {
          normalizedProps[name] = (props as SprinkleStates<Args>)[
            name as keyof SprinkleStates<Args>
          ] as SprinkleProps<Args>;
        } else {
          normalizedProps[baseModifier][name as keyof SprinkleProps<Args>] =
            props[name as keyof SprinkleProps<Args>];
        }
      }

      const classNames = [];
      const style: Record<string, unknown> = {};

      for (const modifier in normalizedProps) {
        const rule = normalizedProps[modifier];
        for (const property in rule) {
          const rawName = rule[property];
          if (
            !(
              typeof rawName === "string" ||
              typeof rawName === "number" ||
              Array.isArray(rawName) ||
              (rawName && typeof rawName === "object")
            )
          ) {
            continue;
          }

          const config = mapPropertyToConfig[property];
          if (!config) {
            throw new Error(`"${property}" is not a valid sprinkle prop`);
          }

          const { conditions, modifiers, styleValues, styles } = config;
          for (const prop of styles[property].mappings) {
            const sprinkle = styles[prop];
            if (!sprinkle || !("values" in sprinkle)) {
              throw new Error(`"${prop}" is not a valid sprinkle prop`);
            }
            const values = Array.isArray(sprinkle.values)
              ? sprinkle.values
              : styleValues[sprinkle.values as number];
            if (process.env.NODE_ENV !== "production") {
              if (
                modifier !== baseModifier &&
                modifiers &&
                !modifiers.includes(modifier)
              ) {
                throw new Error(
                  `"${prop}" has no modifier named "${modifier}". Possible values are ${JSON.stringify(modifiers)}`,
                );
              }
            }
            if (
              !conditions &&
              (Array.isArray(rawName) || typeof rawName === "object")
            ) {
              throw new Error(`"${prop}" is not a conditional property`);
            }
            if (
              conditions &&
              Array.isArray(rawName) &&
              rawName.length > conditions.responsiveArray.length
            ) {
              throw new Error(
                `"${prop}" only supports up to ${conditions.responsiveArray.length} breakpoints. You passed ${rawName.length}`,
              );
            }

            const normalizedNames =
              conditions && Array.isArray(rawName)
                ? rawName
                    .map((name, i) => [conditions.responsiveArray[i], name])
                    .filter(([, name]) => name !== null)
                : typeof rawName === "object"
                  ? Object.entries(rawName)
                  : [[config.conditions?.defaultCondition ?? "", rawName]];
            for (const [rawCondition, name] of normalizedNames) {
              if (process.env.NODE_ENV !== "production") {
                if (
                  conditions &&
                  !conditions.responsiveArray.includes(rawCondition)
                ) {
                  throw new Error(
                    `"${prop}" has no condition named "${rawCondition}". Possible values are ${JSON.stringify(conditions.responsiveArray)}`,
                  );
                }
              }
              if (Array.isArray(values)) {
                if (process.env.NODE_ENV !== "production") {
                  if (!values.includes(name)) {
                    throw new Error(
                      `"${prop}" has no value ${JSON.stringify(name)}. Possible values are ${JSON.stringify(values)}`,
                    );
                  }
                }
              } else {
                if (!(name in values)) {
                  throw new Error(
                    `"${prop}" has no value ${JSON.stringify(name)}. Possible values are ${JSON.stringify(Object.keys(values))}`,
                  );
                }
              }

              const condition =
                rawCondition === config.conditions?.defaultCondition
                  ? ""
                  : rawCondition;
              if (Array.isArray(values)) {
                classNames.push(
                  generateIdentifier(
                    condition,
                    modifier.slice(1) as Ident,
                    prop as Ident,
                    name,
                  ),
                );
              } else {
                const id = generateIdentifier(
                  condition,
                  modifier.slice(1) as Ident,
                  prop as Ident,
                );
                classNames.push(id);

                const value = values[name];
                const rule =
                  value && typeof value === "object"
                    ? value
                    : { [prop]: value };
                for (const [k, v] of Object.entries(rule)) {
                  style[
                    `--${escapeVar(
                      generateIdentifier(
                        condition,
                        modifier.slice(1) as Ident,
                        prop as Ident,
                        k as Ident,
                      ),
                    )}`
                  ] = v;
                }
              }
            }
          }
        }
      }

      return { className: classNames.join(" "), style };
    },
    { properties },
  );
};
