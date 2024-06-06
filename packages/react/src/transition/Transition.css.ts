import { style } from "../vanilla-extract";

export const base = style({
  transformOrigin: "var(--radix-popper-transform-origin)",
  transitionProperty: "opacity, transform",
  transitionTimingFunction: "ease",
});

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
}) =>
  style({
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

export const transitions = {
  fade: generate(presets.fade()),
  "fade-down": generate(presets.fade("down")),
  "fade-left": generate(presets.fade("left")),
  "fade-right": generate(presets.fade("right")),
  "fade-up": generate(presets.fade("up")),

  pop: generate(presets.pop()),
  "pop-down": generate(presets.pop("down")),
  "pop-left": generate(presets.pop("left")),
  "pop-right": generate(presets.pop("right")),
  "pop-up": generate(presets.pop("up")),
};
