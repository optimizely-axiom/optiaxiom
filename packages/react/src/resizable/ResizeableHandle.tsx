import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./ResizableHandle.css";

export type ResizableHandleProps = ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  /**
   * Display a visible handle (with an icon) inside the resizeable panel handle.
   */
  withHandle?: boolean;
};

export const ResizableHandle = ({
  withHandle,
  ...props
}: ResizableHandleProps) => {
  return (
    <Flex {...styles.root()}>
      <ResizablePrimitive.PanelResizeHandle {...props}>
        {withHandle && <Box {...styles.handle()} />}
      </ResizablePrimitive.PanelResizeHandle>
    </Flex>
  );
};

ResizableHandle.displayName = "@optiaxiom/react/ResizableHandle";
