// @ts-expect-error -- no types
import eslint from "@eslint/js";
// @ts-expect-error -- no types
import jsxA11y from "eslint-plugin-jsx-a11y";
// @ts-expect-error -- no types
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
// @ts-expect-error -- no types
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
// @ts-expect-error -- no types
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error -- no types
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tsEslint from "typescript-eslint";

import localPlugin from "../.eslintplugin/index.js";

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
    files: ["**/src/**"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    ignores: ["**/src/**"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.css.ts"],
    rules: {
      "local/no-global-styles": "error",
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
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  {
    files: ["**/*.spec.{ts,tsx}"],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      "local/prefer-testing-library": "error",
      "testing-library/prefer-user-event": "error",
    },
    settings: {
      "testing-library/utils-module": "vitest.rtl",
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
