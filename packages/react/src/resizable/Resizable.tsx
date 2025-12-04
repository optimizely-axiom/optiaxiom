import type { ComponentPropsWithoutRef } from "react";

import * as ResizablePrimitive from "react-resizable-panels";

import type { ExcludeProps } from "../utils";

export type ResizableProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>,
  "direction"
>;

export const Resizable = ({ ...props }: ResizableProps): JSX.Element => {
  return <ResizablePrimitive.PanelGroup direction="horizontal" {...props} />;
};

Resizable.displayName = "@optiaxiom/react/Resizable";
