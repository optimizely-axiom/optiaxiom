import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

import { IconX } from "../icons/IconX";

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
      {withHandle && <IconX />}
    </ResizablePrimitive.PanelResizeHandle>
  );
};

ResizableHandle.displayName = "@optiaxiom/react/ResizableHandle";
