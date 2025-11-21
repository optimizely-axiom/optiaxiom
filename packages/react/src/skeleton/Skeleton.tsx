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
     * Render skeleton as a circle if `true`.
     */
    circle?: boolean;
  }
>;

/**
 * Display placeholder content while data is loading.
 *
 * @since 0.1.0
 *
 * @example
 * <Flex w="full">
 *   <Skeleton />
 *   <Skeleton h="56" />
 *   <Skeleton circle size="56" />
 * </Flex>
 */
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
