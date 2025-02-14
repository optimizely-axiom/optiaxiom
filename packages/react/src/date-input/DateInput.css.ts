import { recipe, style } from "../vanilla-extract";

export const picker = recipe({
  base: style({
    "@supports": {
      "not selector(::-webkit-datetime-edit)": {
        display: "none !important",
      },
    },
  }),
});
