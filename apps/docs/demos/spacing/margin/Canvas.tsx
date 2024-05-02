import { Box, type Sprinkles, Stack } from "@optiaxiom/react";
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
  <Stack
    alignItems="center"
    flexDirection={["vertical", "horizontal"]}
    justifyContent="space-around"
  >
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index} p={p}>
          {item}
        </Item>
      ))}
  </Stack>
);
