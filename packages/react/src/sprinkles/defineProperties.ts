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
  PropertiesDynamic extends AtomicProperties,
  PropertiesStatic extends AtomicProperties,
  Shorthands extends {
    [name: string]: Array<keyof PropertiesDynamic | keyof PropertiesStatic>;
  } = never,
  Conditions extends ConditionProperties = never,
  Modifiers extends Record<`:${string}`, string> = never,
>(options: {
  "@layer"?: string;
  conditions?: Conditions;
  modifiers?: Modifiers;
  propertiesDynamic: PropertiesDynamic;
  propertiesStatic: PropertiesStatic;
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

  const process = (property: string, values: unknown, isStatic = false) => {
    styles[property] = { mappings: [property], values: {} };
    const normalizedValues = Array.isArray(values)
      ? Object.fromEntries(values.map((value) => [value, value]))
      : values;
    if (isStatic) {
      (styles[property] as AtomicStyle<typeof property, unknown>).values =
        Object.keys(normalizedValues);
    } else {
      if (!styleValues.includes(normalizedValues)) {
        /**
         * Replace `var(--foo)` with `--foo` in all `vars` objects
         */
        for (const name in normalizedValues) {
          if (
            typeof normalizedValues[name] === "object" &&
            "vars" in normalizedValues[name]
          ) {
            for (const [key, value] of Object.entries(
              normalizedValues[name].vars,
            )) {
              delete normalizedValues[name].vars[key];
              normalizedValues[name].vars[key.slice(4, -1)] = value;
            }
          }
        }
        styleValues.push(normalizedValues);
      }
      (styles[property] as AtomicStyle<typeof property, unknown>).values =
        styleValues.indexOf(normalizedValues);
    }
    const [, protoValue] = Object.entries(normalizedValues)[0];
    const protoRule =
      protoValue && typeof protoValue === "object"
        ? protoValue
        : { [property]: protoValue };
    const { vars: protoRuleVars, ...protoRuleProps } = protoRule as {
      vars?: object;
    };
    for (const [rawCondition, query] of Object.entries(conditions)) {
      const condition =
        rawCondition === options.conditions?.defaultCondition
          ? ""
          : rawCondition;
      if (isStatic) {
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
          /**
           * In case we have vars we assume the properties depend on these vars
           * and set their values with our own dynamically injected vars.
           *
           * Otherwise we replace each property value with a dynamically
           * injected var.
           */
          let rule = protoRuleVars
            ? {
                vars: Object.fromEntries<unknown>(
                  Object.entries(protoRuleVars).map(([name]) => [
                    name,
                    `var(--${escapeVar(
                      generateIdentifier(
                        condition as Ident,
                        modifier.slice(1) as Ident,
                        name.slice("--sx-".length) as Ident,
                        null,
                        "sv",
                      ),
                    )})`,
                  ]),
                ),
                ...protoRuleProps,
              }
            : Object.fromEntries<unknown>(
                Object.entries(protoRuleProps).map(([name]) => [
                  name,
                  `var(--${escapeVar(
                    generateIdentifier(
                      condition as Ident,
                      modifier.slice(1) as Ident,
                      property as Ident,
                      name as Ident,
                      "sv",
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
  };
  for (const [property, values] of Object.entries(options.propertiesDynamic)) {
    process(property, values);
  }
  for (const [property, values] of Object.entries(options.propertiesStatic)) {
    process(property, values, true);
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
  } as AtomicStyles<PropertiesDynamic> &
    AtomicStyles<PropertiesStatic> &
    // eslint-disable-next-line perfectionist/sort-intersection-types
    ([Conditions] extends [never] ? unknown : ConditionOptions<Conditions>) &
    ([Modifiers] extends [never] ? unknown : ModifierOptions<Modifiers>) &
    ([Shorthands] extends [never] ? unknown : ShorthandStyles<Shorthands>);
};
