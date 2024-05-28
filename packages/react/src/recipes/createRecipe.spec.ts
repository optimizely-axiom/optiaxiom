import { describe, expect, it } from "vitest";

import { createRecipe } from "./createRecipe";

describe("createRecipe", () => {
  const recipe = createRecipe({
    base: {
      border: "1",
    },

    compoundVariants: [
      {
        style: { border: "2" },
        variants: { size: "sm", variant: "primary" },
      },
    ],

    defaultVariants: {
      size: "md",
      variant: "default",
    },

    variants: {
      size: {
        md: ["custom", { fontSize: "md" }],
        sm: { fontSize: "sm" },
      },
      variant: {
        default: {
          ":hover": {
            bg: "blue.50",
          },
          bg: "white",
          color: "blue.500",
        },
        primary: {
          ":hover": {
            bg: "brand.600",
          },
          bg: "brand.500",
          color: "white",
        },
      },
    },
  });

  it("should generate recipes", () => {
    const props = recipe();
    expect(props).toEqual({
      bg: "white",
      border: "1",
      className: "custom",
      color: "blue.500",
      fontSize: "md",
      sx: {
        ":hover": {
          bg: "blue.50",
        },
      },
    });
  });

  it("should handle variants", async () => {
    const props = recipe({ size: "sm" });
    expect(props).toEqual({
      bg: "white",
      border: "1",
      className: "",
      color: "blue.500",
      fontSize: "sm",
      sx: {
        ":hover": {
          bg: "blue.50",
        },
      },
    });
  });

  it("should handle compound variants", async () => {
    const props = recipe({ size: "sm", variant: "primary" });
    expect(props).toEqual({
      bg: "brand.500",
      border: "2",
      className: "",
      color: "white",
      fontSize: "sm",
      sx: {
        ":hover": {
          bg: "brand.600",
        },
      },
    });
  });

  it("should allow extending className", async () => {
    const args = { className: "foo", size: "md" } as const;
    const props = recipe(args);
    expect(props).toEqual({
      bg: "white",
      border: "1",
      className: "foo custom",
      color: "blue.500",
      fontSize: "md",
      sx: {
        ":hover": {
          bg: "blue.50",
        },
      },
    });
  });

  it("should allow overriding sprinkle props", async () => {
    const args = {
      bg: "red",
      size: "sm",
      sx: { ":hover": { color: "white" } },
    } as const;
    const props = recipe(args);
    expect(props).toEqual({
      bg: "red",
      border: "1",
      className: "",
      color: "blue.500",
      fontSize: "sm",
      sx: {
        ":hover": {
          bg: "blue.50",
          color: "white",
        },
      },
    });
  });
});
