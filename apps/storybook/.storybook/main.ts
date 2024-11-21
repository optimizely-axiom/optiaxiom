import type { StorybookConfig } from "@storybook/react-vite";

import { reactDocgenPlugin } from "./react-docgen-plugin";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/experimental-addon-test",
    "@storybook/addon-a11y",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    docsMode: false,
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
