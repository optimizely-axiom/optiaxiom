import { ESLintUtils } from "@typescript-eslint/utils";

const mapSprinkleToStyle = {
  bg: ["backgroundColor"],
  border: ["borderWidth"],
  colSpan: ["gridColumn"],
  cols: ["gridTemplateColumns"],
  fontSize: ["fontSize", "lineHeight"],
  h: ["height"],
  leading: ["lineHeight"],
  m: ["margin", "marginBottom", "marginLeft", "marginRight", "marginTop"],
  maxH: ["maxHeight"],
  maxW: ["maxWidth"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  mt: ["marginTop"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginBottom", "marginTop"],
  p: ["padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  pt: ["paddingTop"],
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingBottom", "paddingTop"],
  rounded: ["borderRadius"],
  shadow: ["boxShadow"],
  size: ["height", "width"],
  tracking: ["letterSpacing"],
  w: ["width"],
  z: ["zIndex"],
};

const normalizeStyle = {
  margin: ["margin", "marginBottom", "marginLeft", "marginRight", "marginTop"],
  padding: [
    "padding",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
  ],
};

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /**
     * @type {Map<
     *  import('@typescript-eslint/utils').TSESTree.CallExpression,
     *  {
     *    sprinkles: Record<string, Array<import('@typescript-eslint/utils').TSESTree.Property>>;
     *    styles: Record<string, Array<import('@typescript-eslint/utils').TSESTree.Property>>
     *  }
     * >}
     */
    const map = new Map();

    /**
     * @param {import('@typescript-eslint/utils').TSESTree.CallExpression} recipe
     * @param {
     *  | import('@typescript-eslint/utils').TSESTree.BlockStatement
     *  | import('@typescript-eslint/utils').TSESTree.SpreadElement
     *  | import('@typescript-eslint/utils').TSESTree.Expression
     *  | import('@typescript-eslint/utils').TSESTree.Property["value"]
     *  | null
     * } node
     */
    const process = (recipe, node) => {
      const collection = map.get(recipe) || {
        sprinkles: {},
        styles: {},
      };
      map.set(recipe, collection);
      if (node?.type === "ArrayExpression") {
        for (const element of node.elements) {
          process(recipe, element);
        }
      } else if (node?.type === "CallExpression") {
        if (
          node.callee.type === "Identifier" &&
          (node.callee.name === "style" ||
            node.callee.name === "responsiveStyle")
        ) {
          const arg = node.arguments[0];
          if (
            arg.type === "ArrayExpression" ||
            arg.type === "ObjectExpression"
          ) {
            const params =
              arg.type === "ObjectExpression" ? [arg] : arg.elements;
            for (const param of params) {
              if (param?.type === "ObjectExpression") {
                let stack = [...param.properties];
                while (stack.length) {
                  const prop = stack.shift();
                  if (!prop) {
                    break;
                  } else if (prop.type === "SpreadElement") {
                    if (prop.argument.type === "ObjectExpression") {
                      stack.push(...prop.argument.properties);
                    }
                  } else if (
                    prop.key.type === "Identifier" &&
                    prop.key.name === "vars"
                  ) {
                    // skip
                  } else if (prop.value.type === "ObjectExpression") {
                    stack.push(...prop.value.properties);
                  } else if (prop.key.type === "Identifier") {
                    for (const name of prop.key.name in normalizeStyle
                      ? // @ts-expect-error -- TS cannot narrow key type
                        normalizeStyle[prop.key.name]
                      : [prop.key.name]) {
                      collection.styles[name] = [
                        ...(collection.styles[name] ?? []),
                        prop,
                      ];
                    }
                  }
                }
              }
            }
          }
        }
      } else if (node?.type === "ObjectExpression") {
        for (const prop of node.properties) {
          if (prop.type !== "Property" || prop.key.type !== "Identifier") {
            continue;
          }

          for (const name of prop.key.name in mapSprinkleToStyle
            ? // @ts-expect-error -- TS cannot narrow key type
              mapSprinkleToStyle[prop.key.name]
            : [prop.key.name]) {
            collection.sprinkles[name] = [
              ...(collection.sprinkles[name] ?? []),
              prop,
            ];
          }
        }
      }
    };

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression[callee.name="recipe"] > ObjectExpression > Property[key.name="base"]':
        (node) => {
          const recipe = node.parent.parent;
          if (recipe?.type !== "CallExpression") {
            return;
          }

          process(recipe, node.value);
        },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression[callee.name="recipe"] > ObjectExpression > Property[key.name="variants"] > ObjectExpression > Property':
        (node) => {
          const recipe = node.parent.parent?.parent?.parent;
          if (recipe?.type !== "CallExpression") {
            return;
          }

          if (node.value.type === "CallExpression") {
            if (
              node.value.callee.type === "Identifier" &&
              node.value.callee.name === "mapValues"
            ) {
              const arg = node.value.arguments[1];
              if (arg.type === "ArrowFunctionExpression" && arg.expression) {
                process(recipe, arg.body);
              }
            }
          } else if (node.value.type === "ObjectExpression") {
            for (const prop of node.value.properties) {
              if (prop.type === "Property") {
                process(recipe, prop.value);
              }
            }
          }
        },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression[callee.name="recipe"] > ObjectExpression > Property[key.name="variantsCompounded"] > ArrayExpression > ObjectExpression > Property[key.name="style"]':
        (node) => {
          const recipe = node.parent.parent?.parent?.parent?.parent;
          if (recipe?.type !== "CallExpression") {
            return;
          }

          process(recipe, node.value);
        },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression[callee.name="recipe"]:exit': (recipe) => {
        const collection = map.get(recipe);
        if (!collection) {
          throw new Error("Could not process recipe");
        }

        const reported = new Map();
        /**
         * @param {import('@typescript-eslint/utils').TSESTree.Property} node
         */
        const report = (node) => {
          if (reported.has(node) || node.key.type !== "Identifier") {
            return;
          }
          reported.set(node, true);
          context.report({
            data: { property: node.key.name },
            messageId: "conflict",
            node,
          });
        };

        for (const [sprinkleKey, nodes] of Object.entries(
          collection.sprinkles,
        )) {
          if (sprinkleKey in collection.styles) {
            for (const node of nodes) {
              report(node);
            }
            for (const node of collection.styles[sprinkleKey]) {
              report(node);
            }
          }
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      conflict: `Please resolve conflicting sprinkle and style properties for "{{property}}".

Do not mix sprinkles and styles for the same property since it will lead to inconsistencies.`,
    },
    schema: [],
    type: "suggestion",
  },
});
