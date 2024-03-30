import { globalLayer, layer } from "@vanilla-extract/css";

const axiom = globalLayer("optimizely-axiom");
export const reset = layer({ parent: axiom }, "reset");
export const app = layer({ parent: axiom }, "app");
