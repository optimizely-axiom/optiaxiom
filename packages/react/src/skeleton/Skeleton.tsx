import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ReactElement } from "react";

import type { Sprinkles } from "../sprinkles";

import { Box, type BoxProps } from "../box";
import * as styles from "./Skeleton.css";

type SkeletonProps = BoxProps<
  "span",
  {
    children?: ReactElement;
    /**
     * Render skeleton as a circle if `true`. Will set the width to be the same as the height.
     */
    circle?: boolean;
    /**
     * Control the height of the skeleton - or both width and height if `circle` is also set to true.
     */
    h?: Sprinkles["h"];
  }
>;

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    { asChild = true, children, circle, className, h, rounded, w, ...props },
    ref,
  ) => {
    return (
      <Box
        asChild={asChild}
        h={h}
        rounded={circle || rounded === "full" ? "full" : (rounded ?? "sm")}
        w={w ?? (circle || rounded === "full" ? h : undefined)}
        {...styles.skeleton({}, className)}
        {...props}
      >
        <Slot ref={ref}>{children ? children : <span />}</Slot>
      </Box>
    );
  },
);

Skeleton.displayName = "@optiaxiom/react/Skeleton";
