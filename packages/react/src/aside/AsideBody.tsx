import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";

export type AsideBodyProps = ComponentPropsWithRef<typeof Box>;

export const AsideBody = forwardRef<HTMLDivElement, AsideBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex flex="1" fontSize="md" px="16" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

AsideBody.displayName = "@optiaxiom/react/AsideBody";
