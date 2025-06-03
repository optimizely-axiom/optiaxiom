import type { StorybookConfig } from "@storybook/react-vite";

import { reactDocgenPlugin } from "./react-docgen-plugin";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-vitest",
    "storybook-addon-test-codegen",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
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
    config.plugins?.push(reactDocgenPlugin());
    config.optimizeDeps?.include?.push(
      "chromatic/isChromatic",
      "react/jsx-dev-runtime",
    );
    return config;
  },
};

export default config;
