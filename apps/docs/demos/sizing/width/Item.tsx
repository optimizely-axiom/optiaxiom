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
      background="purple.500"
      borderRadius="sm"
      display="grid"
      padding="xs"
      placeItems="center"
      {...children.props}
    >
      <Text color="white" fontFamily="mono" fontWeight="600" textAlign="center">
        {label}
      </Text>
    </Box>
  );
};
