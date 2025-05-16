import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type CardFooterProps = BoxProps<"div">;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box alignSelf="stretch" mt="auto" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

CardFooter.displayName = "@optiaxiom/react/CardFooter";
