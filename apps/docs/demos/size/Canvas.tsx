import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
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
  <Flex w="full">
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Flex>>)
      .map((child, index) =>
        cloneElement(
          child,
          { key: index },
          Children.toArray(child.props.children)
            .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
            .map((item, index) => (
              <Item key={index} p={p}>
                {item}
              </Item>
            )),
        ),
      )}
  </Flex>
);
