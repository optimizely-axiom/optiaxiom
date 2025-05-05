import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Layouts.css";

export type LayoutProps = BoxProps<
  "div",
  {
    header?: ReactNode;
    sidebar?: ReactNode;
  }
>;

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, header, sidebar, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.layout({}, className)} {...props}>
        {header}
        <Box
          alignItems="stretch"
          display="flex"
          flex="1"
          flexDirection="row"
          overflow="auto"
        >
          {sidebar}
          <Box flex="1" overflow="auto" px="32" py="24">
            {children}
          </Box>
        </Box>
      </Box>
    );
  },
);

Layout.displayName = "@optiaxiom/react/Layout";
