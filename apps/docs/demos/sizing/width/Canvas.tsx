import { Box, Stack } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({ children }: { children: ReactNode }) => (
  <Stack direction="horizontal" justify="center">
    <Stack>
      {Children.toArray(children)
        .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
        .map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
    </Stack>
  </Stack>
);
