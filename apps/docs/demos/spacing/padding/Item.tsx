import { Box, Text, theme } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box bg="purple.500" display="inline-flex" rounded="sm" {...children.props}>
      <Text
        bg="purple.200"
        color="white"
        fontFamily="mono"
        fontWeight="600"
        p="md"
        rounded="inherit"
        style={{
          background: `rgb(from ${theme.color["purple.50"]} r g b / 20%)`,
        }}
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
