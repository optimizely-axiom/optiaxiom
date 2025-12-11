/**
 * Static list of all sprinkle properties from properties.css.ts
 * This list should be kept in sync with the actual properties defined in properties.css.ts
 */
const SPRINKLE_PROPERTIES = new Set([
  "alignItems",
  "alignSelf",
  "animation",
  "backgroundColor",
  "backgroundImage",
  "bg",
  "border",
  "borderB",
  "borderBottomWidth",
  "borderColor",
  "borderL",
  "borderLeftWidth",
  "borderR",
  "borderRadius",
  "borderRightWidth",
  "borderT",
  "borderTopWidth",
  "boxShadow",
  "color",
  "cursor",
  "display",
  "flex",
  "flexDirection",
  "flexWrap",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "gap",
  "gridColumn",
  "gridTemplateColumns",
  "h",
  "height",
  "justifyContent",
  "justifyItems",
  "m",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "maxH",
  "maxHeight",
  "maxW",
  "maxWidth",
  "mb",
  "ml",
  "mr",
  "mt",
  "mx",
  "my",
  "objectFit",
  "overflow",
  "overflowX",
  "overflowY",
  "p",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "pb",
  "pl",
  "placeItems",
  "pointerEvents",
  "pr",
  "pt",
  "px",
  "py",
  "rounded",
  "shadow",
  "size",
  "textAlign",
  "textTransform",
  "transition",
  "w",
  "whiteSpace",
  "width",
  "z",
  "zIndex",
]);

/** @type {import('eslint').Rule.RuleModule} */
export default {
  create(context) {
    // Check if we're linting properties.css.ts
    if (context.filename.endsWith("sprinkles/properties.css.ts")) {
      return {
        /**
         * Check that all properties in defineProperties match our static list
         * @type {import('eslint').Rule.RuleListener['Property']}
         */
        "CallExpression[callee.name=defineProperties] > ObjectExpression > Property[key.name=properties] > ObjectExpression > Property":
          (node) => {
            if (node.key.type !== "Identifier") {
              return;
            }
            const propName = node.key.name;
            if (!SPRINKLE_PROPERTIES.has(propName)) {
              context.report({
                data: { property: propName },
                messageId: "sync",
                node: node.key,
              });
            }
          },
        /**
         * Check that all shorthands in defineProperties match our static list
         * @type {import('eslint').Rule.RuleListener['Property']}
         */
        "CallExpression[callee.name=defineProperties] > ObjectExpression > Property[key.name=shorthands] > ObjectExpression > Property":
          (node) => {
            if (node.key.type !== "Identifier") {
              return;
            }
            const propName = node.key.name;
            if (!SPRINKLE_PROPERTIES.has(propName)) {
              context.report({
                data: { property: propName },
                messageId: "sync",
                node: node.key,
              });
            }
          },
      };
    }

    // Check TSX files for inline sprinkle props when using recipes
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXSpreadAttribute']}
       */
      'JSXSpreadAttribute:has(MemberExpression[object.name="styles"])': ({
        parent,
      }) => {
        if (parent.type !== "JSXOpeningElement") {
          return;
        }

        for (const attribute of parent.attributes) {
          if (attribute.type === "JSXSpreadAttribute") {
            continue;
          }
          if (attribute.name.type !== "JSXIdentifier") {
            continue;
          }
          if (
            !(
              attribute.value?.type == "Literal" ||
              (attribute.value?.type === "JSXExpressionContainer" &&
                attribute.value.expression.type === "Identifier" &&
                attribute.value.expression.name === "undefined")
            )
          ) {
            continue;
          }

          // Check if this attribute is a sprinkle property
          if (SPRINKLE_PROPERTIES.has(attribute.name.name)) {
            context.report({
              messageId: "expected",
              node: attribute.name,
            });
          }
        }
      },
    };
  },

  meta: {
    fixable: "code",
    messages: {
      expected:
        "Please avoid inlining sprinkle props when using recipes and move them inside the recipe base instead.",
      sync: 'Property "{{property}}" is not in the static SPRINKLE_PROPERTIES list. Please update the list in consistent-recipe-sprinkles.js',
    },
    schema: [],
    type: "suggestion",
  },
};
