import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  cloneElement,
  type ComponentPropsWithRef,
  type ComponentType,
  isValidElement,
  type ReactElement,
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
  }: Sprinkles & {
    children: ReactElement<ComponentPropsWithRef<typeof Flex>>;
  }) {
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
