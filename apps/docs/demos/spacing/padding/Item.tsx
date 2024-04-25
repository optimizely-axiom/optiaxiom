import { Box, Text, theme } from "@optiaxiom/react";
import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
} from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return cloneElement(
    children,
    {
      background: "purple.500",
      borderRadius: "sm",
      display: "inline-flex",
    },
    <Text
      background="purple.200"
      borderRadius="inherit"
      color="white"
      fontFamily="mono"
      fontWeight={600}
      paddingX={1}
      paddingY={0.5}
      style={{
        background: `rgb(from ${theme.color["purple.50"]} r g b / 20%)`,
      }}
    >
      {children.props.children}
    </Text>,
  );
};
