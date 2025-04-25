import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  optimizeDeps: {
    include: [
      "@optiaxiom/*",
      "@radix-ui/*",
      "@storybook/experimental-addon-test/internal/test-utils",
      "react/jsx-dev-runtime",
    ],
  },
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
      storybookScript: "pnpm dev --ci",
    }),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: "playwright",
    },
    isolate: false,
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
