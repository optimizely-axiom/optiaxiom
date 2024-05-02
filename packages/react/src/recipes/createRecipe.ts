/**
 * Forked from https://vanilla-extract.style/documentation/packages/recipes/
 */

import clsx from "clsx";

import { type Sprinkles, sprinkles } from "../sprinkles";
import { mapValues } from "../utils";

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

function complexSprinkles(rule: RecipeStyleRule) {
  return clsx(
    (Array.isArray(rule) ? rule : [rule]).map((rule) =>
      typeof rule === "string" ? rule : sprinkles(rule),
    ),
  );
}

export const createRecipe = <Variants extends VariantGroups>({
  base = {},
  compoundVariants = [],
  defaultVariants = {},
  variants,
}: PatternOptions<Variants>) => {
  const defaultClassName = complexSprinkles(base);
  const compounds = compoundVariants.map(
    ({ style, variants }) => [variants, complexSprinkles(style)] as const,
  );
  const variantClassNames = mapValues(variants, (variantGroup) =>
    mapValues(variantGroup, (styleRule) => complexSprinkles(styleRule)),
  );

  return (options?: Resolve<VariantSelection<Variants>>) => {
    const selections = mapValues(
      variants,
      (_v, variantName) =>
        options?.[variantName] ?? defaultVariants[variantName],
    ) as VariantSelection<Variants>;

    return clsx(
      defaultClassName,
      options &&
        Object.values(
          mapValues(
            variantClassNames,
            (variant, variantName) =>
              selections[variantName] &&
              // @ts-expect-error -- too complex
              variant[
                typeof selections[variantName] === "boolean"
                  ? selections[variantName]
                    ? "true"
                    : "false"
                  : selections[variantName]
              ],
          ),
        ),
      compounds
        .filter(([variants]) => shouldApplyCompound(variants, selections))
        .map(([, compoundClassName]) => compoundClassName),
    );
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
