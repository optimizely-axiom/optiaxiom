import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="purple.500"
      border="2"
      borderColor="neutral.00"
      display="grid"
      ml="-12"
      placeItems="center"
      rounded="full"
      size="64"
      {...children.props}
    >
      <Text color="neutral.00" fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
