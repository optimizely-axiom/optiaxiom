import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box bg="purple.500" p="md" rounded="inherit" {...children.props}>
      <Text
        color="neutral.00"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
