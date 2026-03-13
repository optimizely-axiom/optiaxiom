import { layers } from "@optiaxiom/react/css";
import { globalStyle as veGlobalStyle } from "@vanilla-extract/css";

export const globalStyle = (...args: Parameters<typeof veGlobalStyle>) =>
  veGlobalStyle(args[0], { "@layer": { [layers.components]: args[1] } });
