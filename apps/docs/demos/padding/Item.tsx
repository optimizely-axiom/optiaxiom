import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="bg.avatar.purple"
      display="inline-flex"
      rounded="sm"
      {...children.props}
    >
      <Text
        bg="bg.default.pressed"
        fontFamily="mono"
        fontWeight="600"
        p="16"
        rounded="inherit"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
