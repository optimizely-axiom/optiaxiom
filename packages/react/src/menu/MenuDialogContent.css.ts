import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: style({
    maxHeight: `min(${rem("448px")}, 75dvh)`,
    width: rem("640px"),
  }),
});
