import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "../sprinkles";
import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Skeleton.css";

type SkeletonProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    /**
     * Render skeleton as a circle if `true`. Will set the width to be the same as the `height`.
     */
    circle?: boolean;
    /**
     * Control the height of the skeleton - or both width and height if `circle` is also set to true.
     */
    h?: Sprinkles["h"];
  }
>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ children, circle, className, h, rounded, w, ...props }, ref) => {
    return (
      <Box
        animation="pulse"
        asChild
        bg="bg.neutral"
        className={clsx(className, styles.base)}
        color="surface"
        display="block"
        h={h}
        ref={ref}
        rounded={circle || rounded === "full" ? "full" : rounded ?? "sm"}
        w={w ?? (circle || rounded === "full" ? h : undefined)}
        {...props}
      >
        {children ?? <span />}
      </Box>
    );
  },
);

Skeleton.displayName = "@optiaxiom/react/Skeleton";
