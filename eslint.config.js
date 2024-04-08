import eslint from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsEslint from "typescript-eslint";

import localPlugin from "./.eslintplugin/index.js";

export default tsEslint.config(
  {
    ...eslint.configs.recommended,
    rules: {
      ...eslint.configs.recommended.rules,
      "no-undef": "error",
    },
  },
  {
    ...perfectionistNatural,
    ignores: ["**/src/styles/tokens.ts"],
  },
  {
    ...reactRecommended,
    files: ["**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      ...reactRecommended.plugins,
      "jsx-a11y": { rules: jsxA11y.rules },
    },
    rules: {
      ...reactRecommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ...tsEslint.configs.recommended,
  {
    files: ["**/src/*"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ["**/src/*"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.css.ts"],
    rules: {
      "local/sprinkles-const-array": "error",
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: "error" },
    plugins: {
      local: localPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/out/**",
      "**/storybook-static/**",
    ],
  },
);
