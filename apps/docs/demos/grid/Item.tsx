import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg={
        children.props.gridColumn || children.type === "div"
          ? "bg.success.hovered"
          : "bg.success.light"
      }
      display="grid"
      p="16"
      placeItems="center"
      rounded="sm"
      {...children.props}
    >
      <Text
        color={
          children.props.gridColumn || children.type === "div"
            ? "fg.default.inverse"
            : "fg.default"
        }
        fontFamily="mono"
        fontWeight="600"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
