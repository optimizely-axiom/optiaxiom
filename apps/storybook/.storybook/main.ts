import type { Options } from "@swc/core";

import { ReactDocgenTypeScriptPlugin } from "@storybook/react-docgen-typescript-plugin";
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
  typescript: {
    reactDocgen: false,
  } as unknown as undefined,
  webpackFinal: async (config) => {
    config.plugins?.push(
      new ReactDocgenTypeScriptPlugin({
        include: ["**/**.tsx", "**/packages/react/**/*.d.ts"],
        propFilter: (prop) => !prop.parent,
        savePropValueAsString: true,
        shouldExtractValuesFromUnion: true,
      }),
    );
    config.plugins = config.plugins?.filter(
      (plugin) => !plugin?.constructor.name.includes("ProgressPlugin"),
    );
    return config;
  },
};

export default config;
