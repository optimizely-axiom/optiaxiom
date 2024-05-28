import { Box, Flex } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection={["column", "row"]} justifyContent="space-around">
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
  </Flex>
);
