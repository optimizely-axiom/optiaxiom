import { Box, Flex } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  isValidElement,
  type ReactNode,
} from "react";

import { Item } from "./Item";

export const Canvas = ({
  children,
  name,
}: {
  children: ReactNode;
  name: keyof ComponentPropsWithRef<typeof Box>;
}) => (
  <Flex>
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index} name={name}>
          {item}
        </Item>
      ))}
  </Flex>
);
