import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      asChild
      background="purple.500"
      borderRadius="sm"
      display="grid"
      placeItems="center"
      {...children.props}
    >
      <Text color="white" fontFamily="mono" fontWeight="600" textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  );
};
