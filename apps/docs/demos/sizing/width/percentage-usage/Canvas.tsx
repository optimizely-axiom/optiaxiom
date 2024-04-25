import { Box, Stack } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import { Item } from "../Item";

export const Canvas = ({ children }: { children: ReactNode }) => (
  <Stack>
    {Children.toArray(children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Stack>>)
      .map((child, index) =>
        cloneElement(
          child,
          { key: index },
          Children.toArray(child.props.children)
            .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
            .map((item, index) => <Item key={index}>{item}</Item>),
        ),
      )}
  </Stack>
);
