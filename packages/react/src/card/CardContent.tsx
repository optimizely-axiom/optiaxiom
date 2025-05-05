import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

export type CardContentProps = BoxProps<"div">;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex gap="4" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

CardContent.displayName = "@optiaxiom/react/CardContent";
