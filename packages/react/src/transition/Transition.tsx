import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

import { usePresence } from "../animate-presence";
import * as styles from "./Transition.css";

const transitionDuration = {
  sm: 250,
  md: 400,
  lg: 550,
};

type TransitionProps = ExtendProps<
  ComponentPropsWithRef<"div">,
  {
    duration?: keyof typeof transitionDuration;
  } & styles.TransitionVariants
>;

export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  (
    { children, className, duration = "sm", style, type = "fade", ...props },
    ref,
  ) => {
    const [isPresent, safeToRemove] = usePresence();

    const [enter, setEnter] = useState(false);
    useEffect(() => {
      isPresent && setEnter(true);
    }, [isPresent]);

    useEffect(() => {
      !isPresent && setTimeout(safeToRemove, transitionDuration[duration]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPresent]);

    return (
      <Slot
        ref={ref}
        style={{
          ...style,
          transitionDuration: `${transitionDuration[duration]}ms`,
        }}
        {...styles.transition(
          { type: enter !== isPresent ? type : undefined },
          className,
        )}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
