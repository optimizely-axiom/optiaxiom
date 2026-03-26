import type { StorybookConfig } from "@storybook/react-vite";

import svgr from "vite-plugin-svgr";

import { reactDocgenPlugin } from "./react-docgen-plugin.ts";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-vitest",
    "storybook-addon-test-codegen",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.tsx"],
  typescript: {
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    if (process.env.VITEST) {
      return config;
    }

    config.logLevel = "error";
    config.plugins?.push(
      svgr({
        svgrOptions: {
          svgProps: { fill: "currentColor" },
        },
      }),
      reactDocgenPlugin(),
    );
    config.optimizeDeps?.include?.push(
      "chromatic/isChromatic",
      "react/jsx-dev-runtime",
    );
    return config;
  },
};

export default config;
