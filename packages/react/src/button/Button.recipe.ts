import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    ":active": {
      boxShadow: "md",
    },
    ":data-disabled": {
      color: "fg.quaternary",
    },
    ":focus-visible": {
      outline: "1",
      outlineOffset: "1",
    },
  },

  compoundVariants: [
    {
      style: {
        ":hover-enabled": {
          bg: "bg.error.solid.hover",
        },
        bg: "bg.error.solid",
      },
      variants: {
        colorScheme: "danger",
        variant: "solid",
      },
    },

    {
      style: {
        ":hover-enabled": {
          bg: "bg.brand.solid.hover",
        },
        bg: "bg.brand.solid",
      },
      variants: {
        colorScheme: "primary",
        variant: "solid",
      },
    },

    {
      style: {
        ":hover-enabled": {
          color: "fg.secondary.hover",
        },
        border: "1",
        color: "fg.secondary",
      },
      variants: {
        colorScheme: "secondary",
        variant: "solid",
      },
    },
  ],

  defaultVariants: {
    colorScheme: "primary",
    size: "md",
    variant: "solid",
  },

  variants: {
    colorScheme: {
      danger: {
        ":focus-visible": {
          outlineColor: "red.200",
        },
        ":hover-enabled": {
          bg: "bg.error.subtle",
          borderColor: "bg.error.solid.hover",
          color: "fg.error.hover",
        },
        borderColor: "border.error",
        color: "fg.error",
      },
      primary: {
        ":focus-visible": {
          outlineColor: "brand.300",
        },
        ":hover-enabled": {
          bg: "bg.brand.subtle",
          borderColor: "bg.brand.solid.hover",
          color: "fg.brand.hover",
        },
        borderColor: "border.brand",
        color: "fg.brand",
      },
      secondary: {
        ":focus-visible": {
          outlineColor: "neutral.500",
        },
        ":hover-enabled": {
          bg: "bg.secondary.hover",
        },
        color: "fg.secondary",
      },
    },
    size: {
      lg: { fontSize: "lg", h: "40", px: "16", py: "12" },
      md: { fontSize: "md", h: "32", px: "12", py: "10" },
      sm: { fontSize: "sm", h: "24", px: "10", py: "6" },
    },
    variant: {
      ghost: {
        bg: "transparent",
        border: "0",
      },
      link: {
        bg: "transparent",
        border: "0",
        textDecoration: "underline",
      },
      outline: {
        ":data-disabled": {
          borderColor: "border.disabled",
        },
        bg: "transparent",
        border: "1",
      },
      solid: {
        ":active": {
          boxShadow: "lg",
        },
        ":data-disabled": {
          bg: "bg.disabled",
          border: "0",
        },
        ":hover-enabled": {
          color: "fg.default.inverse",
        },
        border: "0",
        color: "fg.default.inverse",
      },
    },
  },
});

export type Recipe = NonNullable<Parameters<typeof recipe>[0]>;
