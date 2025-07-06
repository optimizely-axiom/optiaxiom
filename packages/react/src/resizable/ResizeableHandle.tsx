import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

import { Box } from "../box";

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
    <ResizablePrimitive.PanelResizeHandle {...props}>
      {withHandle && (
        <Box bg="bg.secondary" border="1" h="56" rounded="sm" w="12" />
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
};

ResizableHandle.displayName = "@optiaxiom/react/ResizableHandle";
