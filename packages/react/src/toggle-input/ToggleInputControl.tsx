import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./ToggleInputControl.css";

type ToggleInputControlProps = BoxProps<"div">;

export const ToggleInputControl = forwardRef<
  HTMLDivElement,
  ToggleInputControlProps
>(({ children, className, ...props }, ref) => {
  return (
    <Box aria-hidden ref={ref} {...styles.control({}, className)} {...props}>
      {children}
    </Box>
  );
});

ToggleInputControl.displayName = "@optiaxiom/react/ToggleInputControl";
