import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ComponentType,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";

export const withSimpleCanvas = (
  Item: ComponentType<{
    children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  }>,
  canvasProps?: Sprinkles,
) => {
  return function Canvas({
    children,
    ...itemProps
  }: {
    children: ReactElement<ComponentPropsWithRef<typeof Flex>>;
  } & Sprinkles) {
    return cloneElement(
      children,
      { w: "full", ...canvasProps },
      Children.toArray(children.props.children)
        .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
        .map((cItem, cIndex) => (
          <Item key={cIndex} {...itemProps}>
            {cItem}
          </Item>
        )),
    );
  };
};
