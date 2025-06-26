import { defineConfig } from "vitest/config";

export default defineConfig({
  optimizeDeps: {
    include: ["react/jsx-dev-runtime"],
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: "playwright",
    },
    maxWorkers: 1,
    restoreMocks: true,
    retry: 1,
    setupFiles: ["./vitest.setup.ts"],
  },
});
