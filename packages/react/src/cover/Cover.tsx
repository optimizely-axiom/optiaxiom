import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Cover.css";

export type CoverProps = BoxProps<"div", styles.CoverVariants>;

/**
 * Use `Cover` to to expand and fill up the whole area of the parent which has `position: relative` using the `::before` pseudo element.
 *
 * @since 1.4.0
 */
export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ className, disabled = false, inset = false, ...props }, ref) => (
    <Box
      ref={ref}
      {...styles.cover({ disabled, inset }, className)}
      {...props}
    />
  ),
);

Cover.displayName = "@optiaxiom/react/Cover";
