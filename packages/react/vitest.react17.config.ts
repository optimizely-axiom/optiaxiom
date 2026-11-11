import { defineConfig, mergeConfig } from "vitest/config";

import config from "./vitest.jsdom.config";

// Runs the specs in jsdom on React 17, which the test-react-17 CI job installs
// into this package first. Our peer range reaches back to React 16.14.
export default mergeConfig(
  config,
  defineConfig({
    resolve: {
      // Workspace packages such as @optiaxiom/globals keep React 18 as a
      // devDependency. A consumer's install has a single React.
      dedupe: ["react", "react-dom"],
    },
    test: {
      name: "@optiaxiom/react:react17",
      server: {
        deps: {
          // What the test environments guide tells React 17 consumers on
          // Vitest to set, for dependencies that import `react/jsx-runtime`.
          // Plus @dnd-kit, which consumers get bundled into our dist and
          // these specs import from source.
          inline: ["@optiaxiom", "@radix", "@dnd-kit"],
        },
      },
    },
  }),
);
