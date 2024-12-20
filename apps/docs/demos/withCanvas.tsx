import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import {
  Children,
  type ComponentPropsWithRef,
  type ComponentType,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export const withCanvas = (
  Item: ComponentType<{
    children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  }>,
  canvasProps?: Sprinkles,
) => {
  return function Canvas({
    children,
    ...itemProps
  }: Sprinkles & { children: ReactNode }) {
    return (
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-around"
        w="full"
        {...canvasProps}
      >
        {Children.toArray(children)
          .filter(isValidElement<ComponentPropsWithRef<typeof Box>>)
          .map((item, index) => (
            <Item key={index} {...itemProps}>
              {item}
            </Item>
          ))}
      </Flex>
    );
  };
};
