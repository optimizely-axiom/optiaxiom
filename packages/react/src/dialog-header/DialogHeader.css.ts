import { recipe, style } from "../vanilla-extract";

export const close = recipe({
  base: [
    style({
      order: "3",
    }),
  ],
});

export const title = recipe({
  base: [
    {
      flex: "1",
      fontWeight: "500",
    },
    style({
      order: "1",
    }),
  ],
});

export const actions = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "8",
    },
    style({
      order: "2",
    }),
  ],
});

export const description = recipe({
  base: [
    {
      color: "fg.secondary",
      fontWeight: "400",
      w: "full",
    },
    style({
      order: "4",
    }),
  ],
});
