import { globalStyle } from "@vanilla-extract/css";

import type {
  AtomicProperties,
  AtomicStyle,
  AtomicStyles,
  ConditionOptions,
  ConditionProperties,
  ModifierOptions,
  ShorthandStyles,
} from "./types";

import { mapValues } from "../utils";
import { type Ident, generateIdentifier } from "./generateIdentifier";

export const defineProperties = <
  Properties extends AtomicProperties,
  Shorthands extends { [name: string]: Array<keyof Properties> } = never,
  Conditions extends ConditionProperties = never,
  Modifiers extends Record<`:${string}`, string> = never,
>(options: {
  "@layer"?: string;
  conditions?: Conditions;
  modifiers?: Modifiers;
  properties: Properties;
  shorthands?: Shorthands;
}) => {
  const conditions = options.conditions?.conditions ?? { "": null };
  const modifiers = {
    ":": "&",
    ...options.modifiers,
  } as const;

  const styles: Record<string, unknown> = mapValues(
    options.shorthands ?? {},
    (mappings) => ({ mappings }),
  );

  for (const [property, values] of Object.entries(options.properties)) {
    styles[property] = { mappings: [property], values: [] };
    const normalizedValues = Array.isArray(values)
      ? Object.fromEntries(values.map((value) => [value, value]))
      : values;
    for (const [name, value] of Object.entries(normalizedValues)) {
      (
        styles[property] as AtomicStyle<typeof property, Array<typeof name>>
      ).values.push(name);
      const rule =
        value && typeof value === "object" ? value : { [property]: value };
      for (const [condition, query] of Object.entries(conditions)) {
        let conditionRule = rule;
        if (query?.["@media"]) {
          conditionRule = { "@media": { [query["@media"]]: conditionRule } };
        }
        if (options["@layer"]) {
          conditionRule = { "@layer": { [options["@layer"]]: conditionRule } };
        }
        const selectors = Object.entries(modifiers).map(
          ([modifier, selector]) =>
            selector.replace(
              "&",
              `.${generateIdentifier(
                (condition === options.conditions?.defaultCondition
                  ? ""
                  : condition) as Ident,
                modifier.slice(1) as Ident,
                property as Ident,
                name as Ident,
              ).replaceAll(/[\\/.:]/g, "\\$&")}`,
            ),
        );
        globalStyle(selectors.join(", "), conditionRule);
      }
    }
  }

  return {
    styles,
    ...(options.conditions && {
      conditions: {
        defaultCondition: options.conditions.defaultCondition,
        responsiveArray: options.conditions.responsiveArray,
      },
    }),
    ...(options.modifiers && {
      modifiers: Object.keys(options.modifiers),
    }),
  } as AtomicStyles<Properties> &
    // eslint-disable-next-line perfectionist/sort-intersection-types
    ([Conditions] extends [never] ? unknown : ConditionOptions<Conditions>) &
    ([Modifiers] extends [never] ? unknown : ModifierOptions<Modifiers>) &
    ([Shorthands] extends [never] ? unknown : ShorthandStyles<Shorthands>);
};
