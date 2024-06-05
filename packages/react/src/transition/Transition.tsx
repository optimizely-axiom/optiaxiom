import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { usePresence } from "framer-motion";
import {
  type ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

import type { ExtendProps } from "../utils";

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
    type?: keyof typeof styles.transitions;
  }
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
        className={clsx(
          className,
          styles.base,
          enter !== isPresent && styles.transitions[type],
        )}
        ref={ref}
        style={{
          ...style,
          transitionDuration: `${transitionDuration[duration]}ms`,
        }}
        {...props}
      >
        {children}
      </Slot>
    );
  },
);

Transition.displayName = "@optiaxiom/react/Transition";
