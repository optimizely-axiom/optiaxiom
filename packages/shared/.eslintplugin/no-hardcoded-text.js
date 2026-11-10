import { ESLintUtils } from "@typescript-eslint/utils";

/**
 * Props and object keys whose string value reaches the user, either on screen
 * or through a screen reader.
 */
const TEXT_PROPS = new Set([
  "alt",
  "aria-description",
  "aria-label",
  "aria-roledescription",
  "aria-valuetext",
  "children",
  "content",
  "empty",
  "label",
  "placeholder",
  "title",
]);

/**
 * Object keys that carry text, e.g. a built-in option group's `label`.
 */
const TEXT_KEYS = new Set(["aria-label", "label", "placeholder", "title"]);

/**
 * Words that read the same in every locale: brand names and loanwords.
 */
const UNTRANSLATED = new Set(["avatar", "Opal"]);

/**
 * Local variables that hold text before it reaches a prop: `const label = …`.
 */
const TEXT_VARIABLE = /(label|message|placeholder|text|title)$/i;

const ENTITY = /&#?\w+;/g;

const LETTER = /\p{L}/u;

const EXEMPT_FILE =
  /\.(spec|stories)\.[jt]sx?$|\.css\.ts$|[\\/]react[\\/]src[\\/]locale[\\/]/;

/**
 * @param {import("@typescript-eslint/utils").TSESTree.Node | null | undefined} node
 * @returns {import("@typescript-eslint/utils").TSESTree.Node | undefined}
 */
const findText = (node) => {
  switch (node?.type) {
    case "BinaryExpression":
      return node.operator === "+"
        ? (findText(node.left) ?? findText(node.right))
        : undefined;
    case "ConditionalExpression":
      return findText(node.consequent) ?? findText(node.alternate);
    case "JSXExpressionContainer":
      return findText(node.expression);
    case "Literal":
      return typeof node.value === "string" &&
        LETTER.test(node.value) &&
        !UNTRANSLATED.has(node.value)
        ? node
        : undefined;
    case "LogicalExpression":
      return findText(node.left) ?? findText(node.right);
    case "TemplateLiteral":
      return node.quasis.some((quasi) => LETTER.test(quasi.value.cooked ?? ""))
        ? node
        : undefined;
  }
  return undefined;
};

/**
 * Children of `<style>` and `<script>` are code, not text.
 *
 * @param {import("@typescript-eslint/utils").TSESTree.Node} node
 */
const isCode = (node) =>
  node.parent?.type === "JSXElement" &&
  node.parent.openingElement.name.type === "JSXIdentifier" &&
  ["script", "style"].includes(node.parent.openingElement.name.name);

/**
 * @param {import("@typescript-eslint/utils").TSESTree.Node} key
 */
const keyName = (key) =>
  key.type === "Identifier"
    ? key.name
    : key.type === "Literal"
      ? String(key.value)
      : undefined;

/**
 * Text written into a component can't follow the consumer's locale, so it
 * reads English to every user.
 */
export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    if (EXEMPT_FILE.test(context.filename)) {
      return {};
    }

    /**
     * @param {import("@typescript-eslint/utils").TSESTree.Node | null | undefined} value
     */
    const check = (value) => {
      const text = findText(value);
      if (text) {
        context.report({ messageId: "hardcoded", node: text });
      }
    };

    return {
      /**
       * Default values of destructured props: `placeholder = "Filter..."`.
       *
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['AssignmentPattern']}
       */
      AssignmentPattern: (node) => {
        if (
          node.parent.type === "Property" &&
          TEXT_PROPS.has(keyName(node.parent.key) ?? "")
        ) {
          check(node.right);
        }
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXAttribute']}
       */
      JSXAttribute: (node) => {
        if (
          node.name.type === "JSXIdentifier" &&
          TEXT_PROPS.has(node.name.name)
        ) {
          check(node.value);
        }
      },

      /**
       * Children: `{ariaLabel || "Calendar"}`.
       *
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXExpressionContainer']}
       */
      JSXExpressionContainer: (node) => {
        if (
          (node.parent.type === "JSXElement" ||
            node.parent.type === "JSXFragment") &&
          !isCode(node)
        ) {
          check(node.expression);
        }
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXText']}
       */
      JSXText: (node) => {
        if (!isCode(node) && LETTER.test(node.value.replace(ENTITY, ""))) {
          context.report({ messageId: "hardcoded", node });
        }
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['VariableDeclarator']}
       */
      VariableDeclarator: (node) => {
        if (node.id.type === "Identifier" && TEXT_VARIABLE.test(node.id.name)) {
          check(node.init);
        }
      },

      /**
       * Object keys: `{ label: "Suggested" }`.
       *
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      Property: (node) => {
        if (
          node.value.type !== "AssignmentPattern" &&
          TEXT_KEYS.has(keyName(node.key) ?? "")
        ) {
          check(node.value);
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    messages: {
      hardcoded:
        "Read built-in text from `useMessages()` so it follows the `AxiomProvider` locale.",
    },
    schema: [],
    type: "problem",
  },
});
