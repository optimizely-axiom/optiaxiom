import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  const label = children.props.children;

  return (
    <Box
      bg="purple.500"
      display="grid"
      p="xs"
      placeItems="center"
      rounded="sm"
      {...children.props}
    >
      <Text
        color="neutral.00"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {label}
      </Text>
    </Box>
  );
};
