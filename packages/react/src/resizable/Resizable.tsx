import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

export type ResizableProps = ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelGroup
>;

export const Resizable = ({ ...props }: ResizableProps) => {
  return <ResizablePrimitive.PanelGroup {...props} />;
};

Resizable.displayName = "@optiaxiom/react/Resizable";
