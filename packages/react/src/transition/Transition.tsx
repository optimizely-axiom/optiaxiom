import { Slot } from "@radix-ui/react-slot";
import { type ReactElement, forwardRef, useEffect, useState } from "react";

import { usePresence } from "../animate-presence";
import * as styles from "./Transition.css";

type TransitionProps = {
  children: ReactElement;
  "data-side"?: "bottom" | "left" | "right" | "top";
} & NonNullable<styles.TransitionVariants>;

export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  ({ children, duration = "md", type = "fade", ...props }, ref) => {
    const [isPresent, safeToRemove] = usePresence();

    const [enter, setEnter] = useState(false);
    useEffect(() => {
      isPresent && setEnter(true);
    }, [isPresent]);

    useEffect(() => {
      !isPresent &&
        setTimeout(safeToRemove, styles.transitionDuration[duration]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPresent]);

    return (
      <Slot
        ref={ref}
        {...styles.transition(
          {
            duration,
            type: enter !== isPresent ? type : undefined,
          },
          undefined,
        )}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
