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
    rules: {
      ...perfectionistNatural.rules,
      "perfectionist/sort-objects": [
        "error",
        {
          "custom-groups": {
            xs: ["xs", "-xs", "tighter"],
            sm: ["sm", "-sm", "tight"],
            md: ["md", "-md", "normal"],
            lg: ["lg", "-lg", "wide"],
            xl: ["xl", "-xl", "wider", "loose"],
            Nxl: ["*xl", "widest"],
          },
          groups: ["xs", "sm", "md", "lg", "xl", "Nxl", "unknown"],
          "partition-by-new-line": true,
          type: "natural",
        },
      ],
    },
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
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": "error",
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
    files: ["**/src/**", "**/.storybook/preview.js"],
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
      "local/css-conventions": "error",
      "local/no-global-styles": "error",
      "local/sprinkles-conventions": "error",
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
        project: [
          "./apps/docs/tsconfig.json",
          "./apps/storybook/tsconfig.json",
          "./packages/react/tsconfig.json",
          "./packages/shared/tsconfig.json",
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            ComponentProps:
              "Please use `ComponentPropsWithRef` or `ComponentPropsWithoutRef` instead.",
          },
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "local/no-useless-clsx": "error",
      "local/prefer-styles-import": "error",
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
