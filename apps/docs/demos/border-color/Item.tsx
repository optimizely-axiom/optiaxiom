import { Box, Flex, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Flex alignItems="center" gap="8">
    <Box bg="bg.default" border="2" px="8" py="16" {...children.props}>
      <Text fontFamily="mono" fontWeight="600" textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  </Flex>
);
