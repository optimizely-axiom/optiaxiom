import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Paper.css";

export type PaperProps = BoxProps<"div", styles.PaperVariants>;

/**
 * Paper component for elevated surfaces
 *
 * @category layout
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ className, elevation = "menu", ...props }, ref) => (
    <Box ref={ref} {...styles.paper({ elevation }, className)} {...props} />
  ),
);

Paper.displayName = "@optiaxiom/react/Paper";
