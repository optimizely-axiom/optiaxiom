import { globalLayer, layer } from "@vanilla-extract/css";

export const axiom = globalLayer("optimizely-axiom");
export const reset = layer({ parent: axiom }, "reset");
