import { Box, theme } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({ children }: { children: ReactElement }) => (
  <Box
    asChild
    background="purple.50"
    borderRadius="sm"
    style={{
      background: `rgb(from ${theme.color["purple.500"]} r g b / 30%)`,
    }}
  >
    {cloneElement(
      children,
      {},
      Children.toArray(children.props.children)
        .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
        .map((item, index) => <Item key={index}>{item}</Item>),
    )}
  </Box>
);
