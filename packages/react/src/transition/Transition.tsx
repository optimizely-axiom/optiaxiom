import {
  type ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

import { usePresence } from "../animate-presence";
import { Box } from "../box";
import * as styles from "./Transition.css";

type TransitionProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  NonNullable<styles.TransitionVariants>
>;

export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  ({ children, className, duration = "sm", type = "fade", ...props }, ref) => {
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
      <Box
        asChild
        ref={ref}
        {...styles.transition(
          { duration, type: enter !== isPresent ? type : undefined },
          className,
        )}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
