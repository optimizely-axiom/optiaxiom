import eslint from "@eslint/js";
// @ts-expect-error -- no types
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionistNatural from "eslint-plugin-perfectionist";
// @ts-expect-error -- no types
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
// @ts-expect-error -- no types
import reactHooks from "eslint-plugin-react-hooks";
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
    ...perfectionistNatural.configs["recommended-natural"],
    rules: {
      ...perfectionistNatural.configs["recommended-natural"].rules,
      "perfectionist/sort-objects": [
        "error",
        {
          customGroups: {
            base: "^base$",
            "2xs": "^\\dxs$",
            xs: "^xs$",
            sm: "^sm$",
            md: "^md$",
            lg: "^lg$",
            xl: "^xl$",
            "2xl": "^\\dxl$",
          },
          groups: ["base", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
          partitionByNewLine: true,
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
      "local/consistent-display-name": "error",
      "local/consistent-recipe-sprinkles": "error",
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
    files: ["**/packages/react/**/*.css.ts"],
    rules: {
      "local/no-aria-selectors": "error",
      "local/no-global-styles": "error",
      "local/no-sprinkles-style-conflict": "error",
      "local/prefer-recipe-export": "error",
      "local/sprinkle-const-array": "error",
      "local/sprinkle-string-type": "error",
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
          "./apps/figma/tsconfig.json",
          "./apps/storybook/tsconfig.json",
          "./packages/globals/tsconfig.json",
          "./packages/react/tsconfig.json",
          "./packages/shared/tsconfig.json",
          "./packages/web-components/tsconfig.json",
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            ComponentProps:
              "Please use `ComponentPropsWithRef` or `ComponentPropsWithoutRef` instead.",
          },
        },
      ],
      "local/missing-recipe-classname": "error",
      "local/no-useless-clsx": "error",
      "local/prefer-styles-import": "error",
      "local/recipe-call-is-valid": "error",
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
