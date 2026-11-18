import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  optimizeDeps: {
    // Stories use TanStack Table v9 and @optiaxiom/proteus depends on v8. One
    // pre-bundle per package name would hand both the same copy.
    exclude: ["@tanstack/react-table"],
    include: [
      "@optiaxiom/*",
      "@radix-ui/*",
      "@storybook/addon-vitest/internal/test-utils",
      "react/jsx-dev-runtime",
      // TanStack Table v9's store imports CommonJS, and the table itself
      // isn't pre-bundled (below).
      "@tanstack/react-table > @tanstack/react-store",
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
      provider: playwright(),
    },
    isolate: false,
    maxWorkers: 4,
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
