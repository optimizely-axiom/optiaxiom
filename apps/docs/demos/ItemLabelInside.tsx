import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

import { stripes } from "./stripes";

export const ItemLabelInside = ({
  children,
  shaded,
  ...props
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  shaded?: boolean;
}) => {
  const margin =
    children.props.m ||
    children.props.mb ||
    children.props.ml ||
    children.props.mr ||
    children.props.mt ||
    children.props.mx ||
    children.props.my;

  const item = (
    <Box
      bg={children.type === "div" ? "bg.avatar.neutral" : "bg.avatar.purple"}
      display="grid"
      p={
        children.props.pb ||
        children.props.pl ||
        children.props.pr ||
        children.props.pt ||
        children.props.px ||
        children.props.py
          ? undefined
          : "16"
      }
      placeItems="center"
      rounded="sm"
      {...props}
      {...children.props}
    >
      <Text
        fontFamily="mono"
        fontSize="md"
        fontWeight="600"
        {...(shaded && {
          bg: "bg.default.pressed",
          p: "4",
          rounded: "inherit",
        })}
      >
        {children.props.children}
      </Text>
    </Box>
  );
  return margin ? (
    <Box rounded="sm" {...(margin && { style: stripes })}>
      {item}
    </Box>
  ) : (
    item
  );
};
