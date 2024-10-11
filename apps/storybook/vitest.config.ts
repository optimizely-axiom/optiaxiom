import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    storybookTest({
      storybookScript: "pnpm dev --ci",
    }),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
      provider: "webdriverio",
    },
    include: ["src/**/*.stories.tsx"],
    isolate: false,
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
