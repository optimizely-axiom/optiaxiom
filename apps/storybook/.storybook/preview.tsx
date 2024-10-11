import type { Preview } from "@storybook/react";

import { AxiomProvider, TransitionGlobalConfig } from "@optiaxiom/react";
import isChromatic from "chromatic/isChromatic";

import "./preview.css";

TransitionGlobalConfig.skipAnimations = isChromatic();

export const loaders = isChromatic()
  ? [
      async () => ({
        fonts: await document.fonts.load("1rem InterVariable"),
      }),
    ]
  : [];

export const parameters = {
  controls: { sort: "requiredFirst" },
  layout: "centered",
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
  useAxiomProvider: true,
};

export const decorators = [
  (Story, context) =>
    context.parameters.useAxiomProvider ? (
      <AxiomProvider>
        <Story />
      </AxiomProvider>
    ) : (
      <Story />
    ),
  (Story, context) =>
    context.parameters.useOverlayDecorator ? (
      <div
        style={{
          display: "grid",
          height: "max(512px, calc(100dvh - 2rem))",
          placeItems: "center",
          width: "max(512px, calc(100dvw - 2rem))",
        }}
      >
        <Story />
      </div>
    ) : (
      <Story />
    ),
] satisfies Preview["decorators"];
