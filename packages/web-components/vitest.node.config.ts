import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["plugins/**/*.test.ts"],
    maxWorkers: 1,
    name: "@optiaxiom/web-components:node",
  },
});
