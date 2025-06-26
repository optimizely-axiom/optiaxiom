import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vanillaExtractPlugin({ unstable_mode: "transform" })],
  test: {
    maxWorkers: 1,
    restoreMocks: true,
  },
});
