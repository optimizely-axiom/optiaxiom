import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Resizable, ResizableHandle, ResizablePanel } from "../resizable";
import * as styles from "./Layouts.css";

export type LayoutProps = BoxProps<
  "div",
  {
    /**
     * Content for the aside area of the layout.
     */
    aside?: ReactNode;
    /**
     * Content for the header area of the layout.
     */
    header?: ReactNode;
    /**
     * Content for the sidebar area of the layout.
     */
    sidebar?: ReactNode;
  }
>;

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ aside, children, className, header, sidebar, ...props }, ref) => {
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

          {aside ? (
            <Box flex="1" overflow="auto" px="32" py="24">
              <Resizable direction="horizontal">
                <ResizablePanel>{children}</ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>{aside}</ResizablePanel>
              </Resizable>
            </Box>
          ) : (
            <Box flex="1" overflow="auto" px="32" py="24">
              {children}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
);

Layout.displayName = "@optiaxiom/react/Layout";
