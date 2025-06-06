import { type BoxProps, Flex } from "@optiaxiom/react";
import Image from "next/image";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";

import { ItemLabelInside } from "./ItemLabelInside";
import { ItemLabelOutside } from "./ItemLabelOutside";
import { stripes } from "./stripes";

export function Canvas({
  asChild,
  children,
  outside,
  shaded,
  striped,
  style,
  transparent,
  ...props
}: BoxProps & {
  outside?: boolean;
  shaded?: boolean;
  striped?: boolean;
  transparent?: boolean;
}) {
  const Item = outside ? ItemLabelOutside : ItemLabelInside;

  return asChild && isValidElement<BoxProps>(children) ? (
    cloneElement(
      children,
      {
        style: {
          isolation: "isolate",
          ...(striped && stripes),
          ...style,
        },
        w: "full",
        ...(striped && { rounded: "md" }),
        ...children.props,
      },
      Children.toArray(children.props.children)
        .filter(isValidElement<BoxProps>)
        .map((cItem, cIndex) => <Item key={cIndex}>{cItem}</Item>),
    )
  ) : (
    <Flex
      flexDirection={["column", "row"]}
      justifyContent="space-around"
      style={{
        isolation: "isolate",
        ...(striped && stripes),
        ...style,
      }}
      w="full"
      {...(striped && { rounded: "md" })}
      {...props}
    >
      {Children.toArray(children)
        .filter(isValidElement<BoxProps>)
        .map((cItem, cIndex) =>
          isImage(cItem) ? (
            cItem
          ) : (
            <Item
              key={cIndex}
              shaded={shaded}
              {...(transparent && { bg: "transparent" })}
            >
              {cItem}
            </Item>
          ),
        )}
    </Flex>
  );
}

const isImage = (element: ReactElement) =>
  element.type === Image ||
  (isValidElement(element.props.children) &&
    element.props.children.type === Image);
