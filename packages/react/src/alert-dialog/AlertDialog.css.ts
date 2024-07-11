import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "white",
      rounded: "lg",
      shadow: "md",
    },
    style({
      position: "absolute",
    }),
  ],
  variants: {
    size: {
      sm: style({ width: "375px" }),
      md: style({ width: "600px" }),
      lg: style({ width: "800px" }),
    },
  },
});

export const overlay = recipe({
  base: [
    {
      alignItems: "center",
      bg: "dark.200",
      size: "full",
    },
    style({
      position: "absolute",
    }),
  ],
});

export const footer = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "md",
      justifyContent: "end",
      px: "24",
      py: "20",
    },
    style({
      borderTop: `1px solid ${theme.colors["border.secondary"]}`,
    }),
  ],
});

export const title = recipe({
  base: [
    {
      fontSize: "2xl",
      fontWeight: "600",
      pb: "16",
      pt: "24",
      px: "24",
    },
  ],
});

export const description = recipe({
  base: [
    {
      fontSize: "md",
      overflow: "auto",
      px: "24",
      py: "16",
    },
    style({
      maxHeight: "50dvh",
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
