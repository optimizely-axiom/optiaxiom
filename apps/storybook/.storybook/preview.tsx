import type { Preview } from "@storybook/react-vite";

import { AxiomProvider, TransitionGlobalConfig } from "@optiaxiom/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import isChromatic from "chromatic/isChromatic";

import "./preview.css";

TransitionGlobalConfig.skipAnimations = isChromatic();

export default {
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
    (Story, context) =>
      context.parameters.useAxiomProvider ? (
        <AxiomProvider>
          <Story />
        </AxiomProvider>
      ) : (
        <Story />
      ),
  ],
  loaders: isChromatic()
    ? [
        async () => ({
          fonts: await document.fonts.load("1rem InterVariable"),
        }),
      ]
    : [],
  parameters: {
    a11y: {
      test: "error",
    },
    controls: { sort: "requiredFirst" },
    layout: "centered",
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
    useAxiomProvider: true,
  },
} satisfies Preview;
