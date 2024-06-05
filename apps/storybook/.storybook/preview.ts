// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require("@optiaxiom/react");
Object.assign(window, components);
require("raw-loader!@optiaxiom/react/dist/index.d.ts");

import isChromatic from "chromatic/isChromatic";

export const loaders = isChromatic()
  ? [
      async () => ({
        fonts: await document.fonts.load("1rem InterVariable"),
      }),
    ]
  : [];

export const parameters = {
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
};
