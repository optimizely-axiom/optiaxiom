import { Box, Flex, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  const { children: label, ...props } = children.props;
  return (
    <Flex alignItems="center" gap="xs">
      <Text
        color="fg.tertiary"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {label}
      </Text>

      <Box
        bg="purple.500"
        display="grid"
        placeItems="center"
        size="64"
        {...props}
      />
    </Flex>
  );
};
