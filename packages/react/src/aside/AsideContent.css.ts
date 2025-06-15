import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const nestedDialogCountVar = createVar();

export const backdrop = recipe({
  variants: {
    hidden: {
      false: {},
      true: style({
        opacity: "0",
      }),
    },
  },
});

export const content = recipe({
  base: [
    {
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
    },
    style({
      position: "fixed",
      transform: `
        translateY(calc(1rem * ${nestedDialogCountVar}))
        scale(calc(1 - 0.06 * ${nestedDialogCountVar}))
      `,
    }),
  ],
  variants: {
    /**
     * Control the position of the dialog box.
     */
    position: {
      bottom: [
        {
          borderT: "1",
        },
        style({
          bottom: 0,
          left: 0,
          right: 0,
        }),
      ],
      left: [
        {
          borderR: "1",
        },
        style({
          bottom: 0,
          height: "100%",
          left: 0,
          maxWidth: ["100%", "lg"],
          top: 0,
          width: ["100%", "50%"],
        }),
      ],
      right: [
        {
          borderL: "1",
        },
        style({
          bottom: 0,
          height: "100%",
          maxWidth: ["100%", "lg"],
          right: 0,
          top: 0,
          width: ["100%", "50%"],
        }),
      ],
    },
  },
});

export type AsideVariants = RecipeVariants<typeof content>;
