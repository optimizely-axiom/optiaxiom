import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Cover.css";

type CoverProps = BoxProps<"div", styles.CoverVariants>;

export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ className, overlay, ...props }, ref) => (
    <Box ref={ref} {...styles.cover({ overlay }, className)} {...props} />
  ),
);

Cover.displayName = "@optiaxiom/react/Cover";
