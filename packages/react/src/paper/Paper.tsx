import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Paper.css";

type PaperProps = BoxProps<"div", NonNullable<styles.PaperVariants>>;

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ className, elevation = "menu", ...props }, ref) => (
    <Box ref={ref} {...styles.paper({ elevation }, className)} {...props} />
  ),
);

Paper.displayName = "@optiaxiom/react/Paper";
