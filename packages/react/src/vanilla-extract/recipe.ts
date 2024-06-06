import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { recipe as veRecipe } from "@vanilla-extract/recipes";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";

import { mapValues } from "../utils";
import { style } from "./style";
import { styleVariants } from "./styleVariants";

export const recipe: typeof veRecipe = (options, debugId) => {
  const {
    base,
    compoundVariants = [],
    defaultVariants = {},
    variants = {},
  } = options;
  let defaultClassName;
  if (!base || typeof base === "string") {
    const baseClassName = style({});
    defaultClassName = base ? `${baseClassName} ${base}` : baseClassName;
  } else {
    defaultClassName = style(base, debugId);
  }

  const variantClassNames = mapValues(
    variants,
    (variantGroup, variantGroupName) =>
      styleVariants(
        variantGroup,
        (styleRule) =>
          typeof styleRule === "string" ? [styleRule] : styleRule,
        debugId ? `${debugId}_${variantGroupName}` : variantGroupName,
      ),
  );
  const compounds = [];
  for (const { style: theStyle, variants: _variants } of compoundVariants) {
    compounds.push([
      _variants,
      typeof theStyle === "string"
        ? theStyle
        : style(theStyle, `${debugId}_compound_${compounds.length}`),
    ]);
  }
  const config = {
    compoundVariants: compounds,
    defaultClassName,
    defaultVariants,
    variantClassNames,
  };
  // @ts-expect-error -- too complex
  return addFunctionSerializer(createRuntimeFn(config), {
    // @ts-expect-error -- too complex
    args: [config],
    importName: "createRuntimeFn",
    importPath: "@vanilla-extract/recipes/createRuntimeFn",
  });
};
