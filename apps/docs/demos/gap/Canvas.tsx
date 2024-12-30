import { Box } from "@optiaxiom/react";
import {
  Children,
  cloneElement,
  type ComponentPropsWithRef,
  isValidElement,
  type ReactElement,
} from "react";

import { ItemLabelInside } from "../ItemLabelInside";

export const Canvas = ({ children }: { children: ReactElement }) => (
  <Box asChild w="full">
    {cloneElement(
      children,
      {},
      Children.toArray(children.props.children)
        .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
        .map((item, index) => (
          <ItemLabelInside key={index}>{item}</ItemLabelInside>
        )),
    )}
  </Box>
);
