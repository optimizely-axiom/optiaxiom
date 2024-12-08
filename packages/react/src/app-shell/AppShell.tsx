import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";

type AppShellProps = BoxProps<
  "div",
  {
    header?: ReactNode;
    sidenav?: ReactNode;
  }
>;

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
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
          <Box flex="1">{children}</Box>
        </Flex>
      </Flex>
    );
  },
);

AppShell.displayName = "@optiaxiom/react/AppShell";
