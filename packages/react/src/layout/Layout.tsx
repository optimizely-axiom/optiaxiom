import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";

type LayoutProps = BoxProps<
  "div",
  {
    header?: ReactNode;
    sidenav?: ReactNode;
  }
>;

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, header, sidenav, ...props }, ref) => {
    return (
      <Flex gap="0" h="full" ref={ref} {...props}>
        {header}
        <Flex
          alignItems="start"
          flexDirection="row"
          gap="0"
          justifyContent="start"
        >
          {sidenav}
          <Box flex="1" h="full">
            {children}
          </Box>
        </Flex>
      </Flex>
    );
  },
);

Layout.displayName = "@optiaxiom/react/Layout";
