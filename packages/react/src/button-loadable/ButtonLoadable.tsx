import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./ButtonLoadable.css";

type ButtonLoadableProps = BoxProps<"div">;

export const ButtonLoadable = forwardRef<HTMLDivElement, ButtonLoadableProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.loadable({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

ButtonLoadable.displayName = "@optiaxiom/react/ButtonLoadable";
