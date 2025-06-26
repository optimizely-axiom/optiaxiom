import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vanillaExtractPlugin({ unstable_mode: "transform" })],
  test: {
    environment: "happy-dom",
    maxWorkers: 1,
    restoreMocks: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
