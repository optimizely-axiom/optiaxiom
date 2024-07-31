import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pagination.css";

type PaginationProps = BoxProps<"div">;

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        ref={ref}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        <Box {...restProps}>Pagination</Box>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
