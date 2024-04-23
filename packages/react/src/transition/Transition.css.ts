import { keyframes } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers } from "../styles";

const presets = {
  fade: (dir?: "down" | "left" | "right" | "up") =>
    ({
      opacity: 0,
      transform: dir
        ? (`translate${dir === "down" || dir === "up" ? "Y" : "X"}(${
            dir === "down" || dir === "right" ? "-" : ""
          }15px)` as const)
        : undefined,
    }) as const,
  pop: (dir?: "down" | "left" | "right" | "up") =>
    ({
      opacity: 0,
      transform: `scale(0.9) ${
        dir
          ? (`translate${dir === "down" || dir === "up" ? "Y" : "X"}(${
              dir === "down" || dir === "right" ? "-" : ""
            }10px)` as const)
          : ""
      }` as const,
    }) as const,
};

const animationType = {
  fade: presets.fade(),
  "fade-down": presets.fade("down"),
  "fade-left": presets.fade("left"),
  "fade-right": presets.fade("right"),
  "fade-up": presets.fade("up"),

  pop: presets.pop(),
  "pop-down": presets.pop("down"),
  "pop-left": presets.pop("left"),
  "pop-right": presets.pop("right"),
  "pop-up": presets.pop("up"),
};
export type AnimationType = keyof typeof animationType;

const animationName = {
  "fade.in": keyframes({ "0%": animationType.fade }),
  "fade.out": keyframes({ "100%": animationType.fade }),
  "fade-down.in": keyframes({ "0%": animationType["fade-down"] }),
  "fade-down.out": keyframes({ "100%": animationType["fade-down"] }),
  "fade-left.in": keyframes({ "0%": animationType["fade-left"] }),
  "fade-left.out": keyframes({ "100%": animationType["fade-left"] }),
  "fade-right.in": keyframes({ "0%": animationType["fade-right"] }),
  "fade-right.out": keyframes({ "100%": animationType["fade-right"] }),
  "fade-up.in": keyframes({ "0%": animationType["fade-up"] }),
  "fade-up.out": keyframes({ "100%": animationType["fade-up"] }),

  "pop.in": keyframes({ "0%": animationType["pop"] }),
  "pop.out": keyframes({ "100%": animationType["pop"] }),
  "pop-down.in": keyframes({ "0%": animationType["pop-down"] }),
  "pop-down.out": keyframes({ "100%": animationType["pop-down"] }),
  "pop-left.in": keyframes({ "0%": animationType["pop-left"] }),
  "pop-left.out": keyframes({ "100%": animationType["pop-left"] }),
  "pop-right.in": keyframes({ "0%": animationType["pop-right"] }),
  "pop-right.out": keyframes({ "100%": animationType["pop-right"] }),
  "pop-up.in": keyframes({ "0%": animationType["pop-up"] }),
  "pop-up.out": keyframes({ "100%": animationType["pop-up"] }),
};

const animationProperties = defineProperties({
  "@layer": layers.axiom,
  conditions: {
    base: {},
    bottom: { selector: '&:is([data-side="bottom"])' },
    left: { selector: '&:is([data-side="left"])' },
    right: { selector: '&:is([data-side="right"])' },
    top: { selector: '&:is([data-side="top"])' },
  },
  defaultCondition: "base",
  properties: {
    animationDuration: {
      lg: "550ms",
      md: "400ms",
      sm: "250ms",
    },
    animationFillMode: ["forwards"] as const,
    animationName,
    animationTimingFunction: ["ease"] as const,
    transformOrigin: {
      popper: "var(--radix-popper-transform-origin)",
    },
  },
});

export const sprinkles = createSprinkles(animationProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
