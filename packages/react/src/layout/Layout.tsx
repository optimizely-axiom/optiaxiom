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
     * Whether to enable resizable panels for the aside area.
     */
    resizable?: boolean;
    /**
     * Content for the sidebar area of the layout.
     */
    sidebar?: ReactNode;
  }
>;

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  (
    { aside, children, className, header, resizable, sidebar, ...props },
    ref,
  ) => {
    return (
      <Box ref={ref} {...styles.layout({}, className)} {...props}>
        {header}
        <Box alignItems="stretch" display="flex" flex="1" overflow="auto">
          {sidebar}

          {resizable ? (
            <Resizable direction="horizontal">
              <ResizablePanel>
                <Box h="full" overflow="auto" px="32" py="24">
                  {children}
                </Box>
              </ResizablePanel>
              {aside && (
                <>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={33}>{aside}</ResizablePanel>
                </>
              )}
            </Resizable>
          ) : (
            <Box alignItems="stretch" display="flex" flex="1">
              <Box
                overflow="auto"
                px="32"
                py="24"
                w={aside ? "2/3" : undefined}
              >
                {children}
              </Box>
              {aside && <Box w="1/3">{aside}</Box>}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
);

Layout.displayName = "@optiaxiom/react/Layout";
