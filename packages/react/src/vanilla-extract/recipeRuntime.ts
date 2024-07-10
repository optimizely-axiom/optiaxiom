import type { CSSProperties } from "react";

import type { ExtendProps } from "../utils";

import { type Sprinkles } from "../sprinkles";

type SprinklesRule = ExtendProps<
  Partial<Record<"selectors" | "vars" | keyof CSSProperties, never>>,
  Sprinkles
>;
type RecipeStyleRule = Array<SprinklesRule | string> | SprinklesRule | string;

type VariantGroups = Record<string, Record<string, unknown>>;

type StringToBoolean<T> = T extends "false" | "true" ? boolean : T;
type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: StringToBoolean<
    keyof Variants[VariantGroup]
  >;
};

type CompoundVariant<Variants extends VariantGroups> = {
  style: RecipeStyleRule;
  variants: VariantSelection<Variants>;
};
type VariantDefinition<Variants extends VariantGroups> = {
  [K in keyof Variants]: { [T in keyof Variants[K]]: RecipeStyleRule };
};

type Resolve<T> = { [Key in keyof T]: T[Key] } & NonNullable<unknown>;

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
    const selections: VariantSelection<Variants> = props ?? {};

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
