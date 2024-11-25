import { globalStyle as veGlobalStyle } from "@vanilla-extract/css";

import { layers } from "../layers";

export const globalStyle = (...args: Parameters<typeof veGlobalStyle>) =>
  veGlobalStyle(args[0], { "@layer": { [layers.components]: args[1] } });
