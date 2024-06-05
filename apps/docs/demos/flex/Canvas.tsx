import { Box, Grid } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";

import { Item } from "./Item";

export const Canvas = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Grid>>;
}) =>
  cloneElement(
    children,
    {},
    Children.toArray(children.props.children)
      .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
      .map((item, index) => <Item key={index}>{item}</Item>),
  );
