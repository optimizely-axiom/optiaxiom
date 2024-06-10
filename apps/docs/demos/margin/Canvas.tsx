import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({
  children,
  p,
}: {
  children: ReactNode;
  p?: Sprinkles["p"];
}) => (
  <Flex
    alignItems="center"
    flexDirection={["column", "row"]}
    justifyContent="space-around"
  >
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index} p={p}>
          {item}
        </Item>
      ))}
  </Flex>
);
