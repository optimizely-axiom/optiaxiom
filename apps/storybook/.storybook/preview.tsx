import type { Preview } from "@storybook/react-vite";

import { AxiomProvider, TransitionGlobalConfig } from "@optiaxiom/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import isChromatic from "chromatic/isChromatic";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

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
          fonts: await document.fonts.load("1rem Roboto Variable"),
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
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        // WCAG 1.4.10 Reflow: a 1280px window at 400% zoom.
        reflow: {
          name: "Reflow (320px)",
          styles: { height: "640px", width: "320px" },
        },
      },
    },
  },
} satisfies Preview;
