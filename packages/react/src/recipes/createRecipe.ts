/**
 * Forked from https://vanilla-extract.style/documentation/packages/recipes/
 */

import clsx from "clsx";

import { type Sprinkles, sprinkles } from "../sprinkles";

type RecipeStyleRule = Array<Sprinkles | string> | Sprinkles | string;

type VariantDefinitions = Record<string, RecipeStyleRule>;

type VariantGroups = Record<string, VariantDefinitions>;

type BooleanMap<T> = T extends "false" | "true" ? boolean : T;
type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>;
};

type CompoundVariant<Variants extends VariantGroups> = {
  style: RecipeStyleRule;
  variants: VariantSelection<Variants>;
};

type PatternOptions<Variants extends VariantGroups> = {
  base?: RecipeStyleRule;
  compoundVariants?: Array<CompoundVariant<Variants>>;
  defaultVariants?: VariantSelection<Variants>;
  variants: Variants;
};

type Resolve<T> = { [Key in keyof T]: T[Key] } & NonNullable<unknown>;

export const createRecipe = <Variants extends VariantGroups>({
  base = {},
  compoundVariants = [],
  defaultVariants = {},
  variants,
}: PatternOptions<Variants>) => {
  return (options?: Resolve<VariantSelection<Variants>>) => {
    const restProps: {
      className?: string;
      sx?: Sprinkles;
    } & Record<string, unknown> = {};
    const selections = { ...defaultVariants };
    for (const [name, value] of Object.entries(options ?? {})) {
      if (name in variants) {
        selections[name as keyof Variants] = value;
      } else {
        restProps[name] = value;
      }
    }

    const classNames: string[] = [];
    const sprinkleProps: Record<string, unknown> = {};
    const sx = restProps.sx ?? {};

    function process(rule: RecipeStyleRule) {
      for (const item of Array.isArray(rule) ? rule : [rule]) {
        if (typeof item === "string") {
          classNames.push(item);
        } else {
          for (const [name, value] of Object.entries(item)) {
            if (sprinkles.properties.has(name as never)) {
              sprinkleProps[name] = value;
            } else {
              // @ts-expect-error -- too complex
              Object.assign((sx[name] = sx[name] ?? {}), value);
            }
          }
        }
      }
    }

    process(base);
    for (const variantName in variants) {
      if (!selections[variantName]) {
        continue;
      }

      const variant = variants[variantName];
      const selection =
        typeof selections[variantName] === "boolean"
          ? selections[variantName]
            ? "true"
            : "false"
          : selections[variantName];
      process(variant[selection as keyof typeof variant]);
    }
    for (const { style, variants } of compoundVariants) {
      if (!shouldApplyCompound(variants, selections)) {
        continue;
      }
      process(style);
    }

    return {
      ...sprinkleProps,
      ...restProps,
      className: clsx(restProps.className, classNames),
      sx,
    };
  };
};

const shouldApplyCompound = <Variants extends VariantGroups>(
  compoundCheck: VariantSelection<Variants>,
  selections: VariantSelection<Variants>,
) => {
  for (const key of Object.keys(compoundCheck)) {
    if (compoundCheck[key] !== selections[key]) {
      return false;
    }
  }

  return true;
};
