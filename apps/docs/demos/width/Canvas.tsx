import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  cloneElement,
  type ComponentPropsWithRef,
  isValidElement,
  type ReactNode,
} from "react";

import { Item } from "./Item";

export const Canvas = ({
  children,
  w,
}: {
  children: ReactNode;
  w?: Sprinkles["w"];
}) => (
  <Flex w={w}>
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Flex>>)
      .map((child, index) =>
        cloneElement(
          child,
          { key: index },
          Children.toArray(child.props.children)
            .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
            .map((item, index) => <Item key={index}>{item}</Item>),
        ),
      )}
  </Flex>
);
