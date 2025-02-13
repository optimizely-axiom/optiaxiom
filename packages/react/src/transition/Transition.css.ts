import { theme } from "@optiaxiom/globals";

import { mapValues } from "../utils";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

const translate = (dir: "down" | "left" | "right" | "up", value: number) => {
  if (dir === "down" || dir === "up") {
    return { y: (dir === "down" ? -1 : 1) * value } as const;
  } else {
    return { x: (dir === "right" ? -1 : 1) * value } as const;
  }
};

const presets = {
  fade: (dir?: "down" | "left" | "right" | "up") => ({
    opacity: 0,
    ...(dir && translate(dir, 15)),
  }),
  pop: (dir?: "down" | "left" | "right" | "up") => ({
    opacity: 0,
    scale: 0.95,
    ...(dir && translate(dir, 8)),
  }),
  slide: (dir?: "down" | "left" | "right" | "up") => ({
    gridTemplateRows: "0fr !important",
    opacity: 0,
    ...(dir && translate(dir, 8)),
  }),
  slidePop: (dir?: "down" | "left" | "right" | "up") => ({
    gridTemplateRows: "0fr !important",
    opacity: 0,
    scale: 0.95,
    ...(dir && translate(dir, 8)),
  }),
};

const generate = ({
  gridTemplateRows,
  opacity,
  scale,
  x,
  y,
}: {
  gridTemplateRows?: string;
  opacity: number;
  scale?: number;
  x?: number;
  y?: number;
}) => ({
  ...(typeof gridTemplateRows !== "undefined" && { gridTemplateRows }),
  ...(typeof opacity !== "undefined" && { opacity }),
  ...((typeof scale !== "undefined" ||
    typeof x !== "undefined" ||
    typeof y !== "undefined") && {
    transform: [
      typeof scale !== "undefined" && `scale(${scale})`,
      typeof x !== "undefined" && `translateX(${x}px)`,
      typeof y !== "undefined" && `translateY(${y}px)`,
    ]
      .filter(Boolean)
      .join(" "),
  }),
});

export const transition = recipe({
  base: style({
    transformOrigin: "var(--radix-popper-transform-origin)",
    transitionProperty: "grid-template-rows, opacity, transform",
    transitionTimingFunction: "ease",
  }),

  variants: {
    duration: mapValues(theme.duration, (transitionDuration) =>
      style({ transitionDuration }),
    ),

    type: mapValues(presets, (fn) =>
      style({
        ...generate(fn()),

        selectors: {
          '&[data-side="bottom"]': generate(fn("down")),
          '&[data-side="left"]': generate(fn("left")),
          '&[data-side="right"]': generate(fn("right")),
          '&[data-side="top"]': generate(fn("up")),
        },
      }),
    ),
  },
});

export type TransitionVariants = RecipeVariants<typeof transition>;
