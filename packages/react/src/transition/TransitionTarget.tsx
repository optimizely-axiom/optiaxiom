import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ReactNode, forwardRef, useEffect } from "react";

import { mapValues } from "../utils";
import * as styles from "./TransitionTarget.css";

type TransitionProps = {
  children: ReactNode;
  className?: string;
  duration?: styles.Sprinkles["animationDuration"];
  dynamicSide?: boolean;
  onMount?: () => void;
  onUnmount?: () => void;
  open?: boolean;
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

export const TransitionTarget = forwardRef<HTMLElement, TransitionProps>(
  (
    {
      children,
      className,
      duration = "sm",
      dynamicSide,
      onMount,
      onUnmount,
      open,
      type = "fade",
      ...props
    },
    ref,
  ) => {
    const animationType = type;
    const animationName =
      dynamicSide && (animationType === "fade" || animationType === "pop")
        ? mapValues(
            mapSideToType[animationType],
            (value) => `${value}${open ? ".in" : ".out"}` as const,
          )
        : (`${animationType}${open ? ".in" : ".out"}` as const);

    useEffect(() => onMount?.(), [onMount]);

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
          !open && onUnmount?.();
        }}
        ref={ref}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

TransitionTarget.displayName = "@optiaxiom/react/TransitionTarget";
