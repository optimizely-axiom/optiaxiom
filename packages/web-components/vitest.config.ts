import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
    },
    restoreMocks: true,
    retry: 1,
    setupFiles: ["./vitest.setup.ts"],
  },
});
