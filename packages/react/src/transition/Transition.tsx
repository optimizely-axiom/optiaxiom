import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { usePresence } from "framer-motion";
import { type ReactNode, forwardRef } from "react";

import { mapValues } from "../utils";
import * as styles from "./Transition.css";

type TransitionProps = {
  children: ReactNode;
  className?: string;
  duration?: styles.Sprinkles["animationDuration"];
  dynamicSide?: boolean;
  type?: styles.AnimationType;
};

const mapSideToType = {
  fade: {
    bottom: "fade-up",
    left: "fade-right",
    right: "fade-left",
    top: "fade-down",
  },
  pop: {
    bottom: "pop-down",
    left: "pop-left",
    right: "pop-right",
    top: "pop-up",
  },
} as const;

export const Transition = forwardRef<HTMLElement, TransitionProps>(
  (
    {
      children,
      className,
      duration = "sm",
      dynamicSide,
      type = "fade",
      ...props
    },
    ref,
  ) => {
    const [isPresent, safeToRemove] = usePresence();

    const animationType = type;
    const animationName =
      dynamicSide && (animationType === "fade" || animationType === "pop")
        ? mapValues(
            mapSideToType[animationType],
            (value) => `${value}${isPresent ? ".in" : ".out"}` as const,
          )
        : (`${animationType}${isPresent ? ".in" : ".out"}` as const);

    return (
      <Slot
        className={clsx(
          className,
          styles.sprinkles({
            animationDuration: duration,
            animationFillMode: "forwards",
            animationName,
            animationTimingFunction: "ease",
            transformOrigin: "popper",
          }),
        )}
        onAnimationEnd={() => {
          !isPresent && safeToRemove();
        }}
        ref={ref}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
