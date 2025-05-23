import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactElement, useRef } from "react";

import * as styles from "./Transition.css";
import { TransitionGlobalConfig } from "./TransitionGlobalConfig";
import { useTransitionStatus } from "./useTransitionStatus";

const Slot = createSlot("@optiaxiom/react/Transition");

export type TransitionProps = styles.TransitionVariants & {
  children: ReactElement;
  className?: string;
  "data-side"?: "bottom" | "left" | "right" | "top";
  /**
   * Whether to skip the animation or not. Useful for initial mount and unit testing.
   */
  skipAnimations?: boolean;
  /**
   * The properties to animate during transition.
   *  - fade: only animate the opacity
   *  - pop: animate the opacity, scale, and translate (depending on data-side)
   */
  type?: "fade" | "pop";
};

export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  (
    {
      children,
      className,
      duration = "md",
      skipAnimations,
      type = "fade",
      ...props
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    const transitionStatus = useTransitionStatus(innerRef);
    const ref = useComposedRefs(outerRef, innerRef);

    return skipAnimations || TransitionGlobalConfig.skipAnimations ? (
      <Slot className={className} ref={ref} {...props}>
        {children}
      </Slot>
    ) : (
      <Slot
        data-transition-fade={transitionStatus ? "" : undefined}
        data-transition-pop={
          transitionStatus && type === "pop" ? "" : undefined
        }
        data-transition-state={transitionStatus}
        data-transition-translate={
          transitionStatus && type === "pop" ? "" : undefined
        }
        ref={ref}
        {...styles.transition({ duration }, className)}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
