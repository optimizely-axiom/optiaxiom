import type { CSSProperties } from "react";

import type { ExtendProps } from "../utils";

import { type Sprinkles } from "../sprinkles";

type CompoundVariant<Variants extends VariantGroups> = {
  style: RecipeStyleRule;
  variants: VariantSelection<Variants>;
};
type RecipeStyleRule = Array<SprinklesRule | string> | SprinklesRule | string;

type Resolve<T> = [T[keyof T]] extends [never]
  ? Record<string, never>
  : NonNullable<unknown> & { [Key in keyof T]: T[Key] };

type SprinklesRule = ExtendProps<
  Partial<Record<"selectors" | "vars" | keyof CSSProperties, never>>,
  Sprinkles
>;
type StringToBoolean<T> = T extends "false" | "true" ? boolean : T;

type VariantDefinition<Variants extends VariantGroups> = {
  [K in keyof Variants]: { [T in keyof Variants[K]]: RecipeStyleRule };
};
type VariantGroups = Record<string, Record<string, unknown>>;

type VariantSelection<Variants extends VariantGroups> = [
  Variants[keyof Variants],
] extends [never]
  ? Record<string, never>
  : {
      [VariantGroup in keyof Variants]?: StringToBoolean<
        keyof Variants[VariantGroup]
      >;
    };

export const recipeRuntime = <
  Variants extends VariantGroups = Record<string, never>,
>({
  base = {},
  variants,
  variantsCompounded = [],
}: {
  base?: RecipeStyleRule;
  variants?: VariantDefinition<Variants>;
  variantsCompounded?: Array<CompoundVariant<NoInfer<Variants>>>;
}) => {
  return (props?: Resolve<VariantSelection<Variants>>, className?: string) => {
    const selections = (props ?? {}) as VariantSelection<Variants>;

    const classNames: string[] = className ? [className] : [];
    const sprinkleProps: Record<string, unknown> = {};

    function process(rule: RecipeStyleRule) {
      for (const item of Array.isArray(rule) ? rule : [rule]) {
        if (typeof item === "string") {
          classNames.push(item);
        } else {
          for (const [name, value] of Object.entries(item)) {
            sprinkleProps[name] = value;
          }
        }
      }
    }

    process(base);
    for (const variantName in variants) {
      if (
        selections[variantName] === null ||
        selections[variantName] === undefined
      ) {
        continue;
      }

      const variant = variants[variantName];
      const selection =
        typeof selections[variantName] === "boolean"
          ? selections[variantName]
            ? "true"
            : "false"
          : selections[variantName];
      if (String(selection) in variant) {
        process(variant[selection]);
      }
    }
    for (const { style, variants } of variantsCompounded) {
      if (!shouldApplyCompound(variants, selections)) {
        continue;
      }
      process(style);
    }

    return {
      ...sprinkleProps,
      className: classNames.join(" "),
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
