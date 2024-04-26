import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      background="purple.500"
      borderRadius="inherit"
      padding="md"
      {...children.props}
    >
      <Text color="white" fontFamily="mono" fontWeight="600" textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  );
};
