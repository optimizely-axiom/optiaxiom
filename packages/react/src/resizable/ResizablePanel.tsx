import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

export type ResizablePanelProps = ComponentPropsWithoutRef<
  typeof ResizablePrimitive.Panel
>;
export const ResizablePanel = ({ ...props }: ResizablePanelProps) => {
  return <ResizablePrimitive.Panel {...props} />;
};

ResizablePanel.displayName = "@optiaxiom/react/ResizablePanel";
