import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Backdrop.css";

type BackdropProps = BoxProps;

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ className, ...props }, ref) => (
    <Box ref={ref} {...styles.backdrop({}, className)} {...props} />
  ),
);

Backdrop.displayName = "@optiaxiom/react/Backdrop";
