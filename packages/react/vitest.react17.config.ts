import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";

import config from "./vitest.jsdom.config";

const tanstack8 = fileURLToPath(
  new URL("./vitest.tanstack8.ts", import.meta.url),
);

// Runs the specs in jsdom on React 17, which the test-react-17 CI job installs
// into this package first, with TanStack Table v8. Our peer range reaches back
// to React 16.14.
export default mergeConfig(
  config,
  defineConfig({
    plugins: [
      {
        enforce: "pre",
        name: "tanstack8",
        // The specs use v9's API; the shim maps it onto the installed v8.
        resolveId: (source, importer) =>
          source === "@tanstack/react-table" && importer !== tanstack8
            ? tanstack8
            : undefined,
      },
    ],
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
          // Plus @dnd-kit and @ui-sdk: these specs import them from source,
          // while consumers get them bundled into our dist.
          inline: ["@optiaxiom", "@radix", "@dnd-kit", "@ui-sdk"],
        },
      },
      setupFiles: ["./vitest.react17.setup.ts"],
    },
  }),
);
