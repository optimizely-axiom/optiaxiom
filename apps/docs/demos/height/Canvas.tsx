import { Box, Flex } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  isValidElement,
  type ReactNode,
} from "react";

import { Item } from "./Item";

export const Canvas = ({ children }: { children: ReactNode }) => (
  <Flex alignItems="end" flexDirection="row" justifyContent="center">
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
  </Flex>
);
