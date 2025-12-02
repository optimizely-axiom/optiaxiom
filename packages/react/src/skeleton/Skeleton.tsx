import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactElement } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Skeleton.css";

const Slot = createSlot("@optiaxiom/react/Skeleton");

export type SkeletonProps = BoxProps<
  "span",
  {
    children?: ReactElement;
    /**
     * Render skeleton as a circle if `true`. When enabled, automatically sets
     * rounded="full".
     */
    circle?: boolean;
    /**
     * Border radius of the skeleton. Defaults to "sm" for regular shapes,
     * automatically set to "full" when circle={true}.
     */
    rounded?: BoxProps["rounded"];
  }
>;

/**
 * Display placeholder content while data is loading.
 *
 * @category feedback
 * @category layout
 * @since 0.1.0
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    { asChild = true, children, circle, className, rounded = "sm", ...props },
    ref,
  ) => {
    return (
      <Box
        asChild={asChild}
        rounded={circle || rounded === "full" ? "full" : rounded}
        {...styles.skeleton({}, className)}
        {...props}
      >
        <Slot ref={ref}>{children ? children : <span />}</Slot>
      </Box>
    );
  },
);

Skeleton.displayName = "@optiaxiom/react/Skeleton";
