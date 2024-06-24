// eslint-disable-next-line local/no-global-styles
import { globalLayer, layer } from "@vanilla-extract/css";

export const axiom = globalLayer("optiaxiom");
export const reset = layer({ parent: axiom }, "reset");
export const components = layer({ parent: axiom }, "components");
