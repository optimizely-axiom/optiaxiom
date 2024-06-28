import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    environment: "happy-dom",
    restoreMocks: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
