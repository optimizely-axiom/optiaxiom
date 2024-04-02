import type { Options } from "@swc/core";

import { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-webpack5-compiler-swc",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    docsMode: false,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
  // TODO: fix docgen
  swc: (config: Options): Options => {
    return {
      ...config,
      jsc: {
        transform: {
          react: { runtime: "automatic" },
        },
      },
    };
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins?.filter(
      (plugin) => !plugin?.constructor.name.includes("ProgressPlugin"),
    );
    return config;
  },
};

export default config;
