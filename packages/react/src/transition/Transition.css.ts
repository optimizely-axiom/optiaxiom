import { mapValues } from "../utils";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

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
    scale: 0.9,
    ...(dir && translate(dir, 10)),
  }),
};

const generate = ({
  opacity,
  scale,
  x,
  y,
}: {
  opacity: number;
  scale?: number;
  x?: number;
  y?: number;
}) => ({
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

export const transitionDuration = {
  sm: 150,
  md: 250,
  lg: 400,
} as const;

export const transition = recipe({
  base: style({
    transformOrigin: "var(--radix-popper-transform-origin)",
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease",
  }),

  variants: {
    duration: mapValues(transitionDuration, (duration) =>
      style({ transitionDuration: `${duration}ms` }),
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
