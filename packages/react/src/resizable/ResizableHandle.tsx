import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./ResizableHandle.css";

export type ResizableHandleProps = ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelResizeHandle
>;

export const ResizableHandle = (props: ResizableHandleProps) => {
  return (
    <Flex asChild {...styles.root()}>
      <ResizablePrimitive.PanelResizeHandle {...props}>
        <Box {...styles.handle()} />
      </ResizablePrimitive.PanelResizeHandle>
    </Flex>
  );
};

ResizableHandle.displayName = "@optiaxiom/react/ResizableHandle";
