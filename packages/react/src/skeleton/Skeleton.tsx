import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Skeleton.css";

type SkeletonProps = ComponentPropsWithRef<typeof Box>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box
        animation="pulse"
        asChild
        bg="bg.neutral"
        className={clsx(className, styles.base)}
        color="bg.neutral"
        display="block"
        ref={ref}
        rounded="sm"
        {...props}
      >
        {children ?? <span />}
      </Box>
    );
  },
);

Skeleton.displayName = "@optiaxiom/react/Skeleton";
