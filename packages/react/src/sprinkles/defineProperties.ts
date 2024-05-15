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
import {
  type Ident,
  escapeVar,
  generateIdentifier,
} from "./generateIdentifier";

const escapeCss = (value: string) => value.replaceAll(/[\\/.:]/g, "\\$&");

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
  const styleValues: unknown[] = [];

  for (const [property, values] of Object.entries(options.properties)) {
    styles[property] = { mappings: [property], values: {} };
    const normalizedValues = Array.isArray(values)
      ? Object.fromEntries(values.map((value) => [value, value]))
      : values;
    const [, protoValue] = Object.entries(normalizedValues)[0];
    const protoRule =
      protoValue && typeof protoValue === "object"
        ? protoValue
        : { [property]: protoValue };
    if (!styleValues.includes(normalizedValues)) {
      styleValues.push(normalizedValues);
    }
    (styles[property] as AtomicStyle<typeof property, unknown>).values =
      Array.isArray(values) ? values : styleValues.indexOf(normalizedValues);
    for (const [rawCondition, query] of Object.entries(conditions)) {
      const condition =
        rawCondition === options.conditions?.defaultCondition
          ? ""
          : rawCondition;
      if (Array.isArray(values)) {
        for (const [name, value] of Object.entries(normalizedValues)) {
          let rule =
            value && typeof value === "object" ? value : { [property]: value };
          if (query?.["@media"]) {
            rule = { "@media": { [query["@media"]]: rule } };
          }
          if (options["@layer"]) {
            rule = {
              "@layer": { [options["@layer"]]: rule },
            };
          }
          globalStyle(
            Object.entries(modifiers)
              .map(([modifier, selector]) =>
                selector.replace(
                  "&",
                  `.${escapeCss(
                    generateIdentifier(
                      condition as Ident,
                      modifier.slice(1) as Ident,
                      property as Ident,
                      name as Ident,
                    ),
                  )}`,
                ),
              )
              .join(", "),
            rule,
          );
        }
      } else {
        for (const [modifier, selector] of Object.entries(modifiers)) {
          let rule = Object.fromEntries<unknown>(
            Object.entries(protoRule).map(([name]) => [
              name,
              `var(--${escapeVar(
                generateIdentifier(
                  condition as Ident,
                  modifier.slice(1) as Ident,
                  property as Ident,
                  name as Ident,
                ),
              )})`,
            ]),
          );
          if (query?.["@media"]) {
            rule = { "@media": { [query["@media"]]: rule } };
          }
          if (options["@layer"]) {
            rule = {
              "@layer": { [options["@layer"]]: rule },
            };
          }
          globalStyle(
            selector.replace(
              "&",
              `.${escapeCss(
                generateIdentifier(
                  condition as Ident,
                  modifier.slice(1) as Ident,
                  property as Ident,
                ),
              )}`,
            ),
            rule,
          );
        }
      }
    }
  }

  return {
    styleValues,
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
