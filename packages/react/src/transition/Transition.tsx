import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ReactElement, useEffect, useState } from "react";

import { usePresence } from "../use-presence";
import * as styles from "./Transition.css";
import { TransitionGlobalConfig } from "./TransitionGlobalConfig";

type TransitionProps = styles.TransitionVariants & {
  children: ReactElement;
  "data-side"?: "bottom" | "left" | "right" | "top";
  skipAnimations?: boolean;
};

export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  (
    { children, duration = "md", skipAnimations, type = "fade", ...props },
    ref,
  ) => {
    const [isPresent, safeToRemove] = usePresence();

    const [enter, setEnter] = useState(false);
    useEffect(() => {
      if (isPresent) {
        requestAnimationFrame(() => setEnter(true));
      }
    }, [isPresent]);

    useEffect(() => {
      if (!isPresent) {
        setTimeout(safeToRemove, styles.transitionDuration[duration]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPresent]);

    return skipAnimations || TransitionGlobalConfig.skipAnimations ? (
      <Slot ref={ref}>{children}</Slot>
    ) : (
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
