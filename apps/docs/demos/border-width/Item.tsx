import { Box, Flex, Text, theme } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Flex alignItems="center" gap="8">
    <Box
      bg="bg.default"
      borderColor="link.fg.visited"
      display="grid"
      placeItems="center"
      px="8"
      py="16"
      style={{ outline: `1px solid ${theme.colors["border.default"]}` }}
      {...children.props}
    >
      <Text fontFamily="mono" fontWeight="600" textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  </Flex>
);
