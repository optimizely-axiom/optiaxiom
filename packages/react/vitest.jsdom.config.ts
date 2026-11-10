import { defineConfig, mergeConfig } from "vitest/config";

import config from "./vitest.config";

// Runs the specs again in jsdom, the environment most consumers test in. See
// the root README for why jsdom is pinned.
export default mergeConfig(
  config,
  defineConfig({
    test: {
      environment: "jsdom",
      name: "@optiaxiom/react:jsdom",
      setupFiles: ["./vitest.jsdom.setup.ts"],
    },
  }),
);
