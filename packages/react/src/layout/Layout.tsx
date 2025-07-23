import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Resizable, ResizableHandle, ResizablePanel } from "../resizable";
import * as styles from "./Layout.css";

export type LayoutProps = BoxProps<
  "div",
  styles.LayoutVariants & {
    /**
     * Content for the details panel area of the layout.
     */
    detailsPanel?: ReactNode;
    /**
     * Content for the header area of the layout.
     */
    header?: ReactNode;
    /**
     * Whether to enable resizable panels for the details panel area.
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
    {
      children,
      className,
      detailsPanel,
      header,
      resizable,
      sidebar,
      size = "screen",
      ...props
    },
    ref,
  ) => {
    return (
      <Box ref={ref} {...styles.layout({ size }, className)} {...props}>
        {header}
        <Box display="flex" flex="1" overflow="auto">
          {sidebar}

          {resizable ? (
            <Resizable direction="horizontal">
              <ResizablePanel minSize={33}>
                <Box asChild h="full">
                  {children}
                </Box>
              </ResizablePanel>
              {detailsPanel && (
                <>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={33} minSize={33}>
                    {detailsPanel}
                  </ResizablePanel>
                </>
              )}
            </Resizable>
          ) : (
            <Box display="flex" flex="1">
              <Box asChild w={detailsPanel ? "2/3" : "full"}>
                {children}
              </Box>
              {detailsPanel && <Box w="1/3">{detailsPanel}</Box>}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
);

Layout.displayName = "@optiaxiom/react/Layout";
