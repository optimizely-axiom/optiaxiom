import { Box, Stack } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({
  children,
  padding,
}: {
  children: ReactNode;
  padding?: ComponentPropsWithRef<typeof Box>["padding"];
}) => (
  <Stack direction="horizontal" justify="space-around">
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => (
        <Item key={index} padding={padding}>
          {item}
        </Item>
      ))}
  </Stack>
);
