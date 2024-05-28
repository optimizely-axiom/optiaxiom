import { Box, Flex } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection="horizontal" justifyContent="center">
    <Flex>
      {Children.toArray(children)
        .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
        .map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
    </Flex>
  </Flex>
);
