import { Slot as RadixSlot } from "radix-ui";
import { forwardRef, type ReactElement } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Skeleton.css";

const Slot = RadixSlot.createSlot("@optiaxiom/react/Skeleton");

type SkeletonProps = BoxProps<
  "span",
  {
    children?: ReactElement;
    /**
     * Render skeleton as a circle if `true`.
     */
    circle?: boolean;
  }
>;

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ asChild = true, children, circle, className, rounded, ...props }, ref) => {
    return (
      <Box
        asChild={asChild}
        rounded={circle || rounded === "full" ? "full" : (rounded ?? "sm")}
        {...styles.skeleton({}, className)}
        {...props}
      >
        <Slot ref={ref}>{children ? children : <span />}</Slot>
      </Box>
    );
  },
);

Skeleton.displayName = "@optiaxiom/react/Skeleton";
