import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "apps/*/vitest.config.ts",
      "packages/*/vitest.config.ts",
      "packages/*/vitest.node.config.ts",
    ],
    reporters: ["default", "hanging-process"],
  },
});
