import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Options } from "@swc/core";

import { ReactDocgenTypeScriptPlugin } from "@storybook/react-docgen-typescript-plugin";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
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
  stories: ["../src/**/*.stories.tsx"],
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
        propFilter: (prop) =>
          prop.parent
            ? !prop.parent.fileName.includes("@types/react")
            : !!prop.declarations?.find(
                (declaration) =>
                  declaration.fileName ===
                  "optiaxiom/packages/react/dist/index.d.ts",
              ) && !["asChild"].includes(prop.name),
        savePropValueAsString: true,
        tsconfigPath: "../tsconfig.json",
      }),
    );
    config.plugins = config.plugins?.filter(
      (plugin) => !plugin?.constructor.name.includes("ProgressPlugin"),
    );
    return config;
  },
};

export default config;
