import { Box, Flex, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  const { children: label, ...props } = children.props;
  return (
    <Flex alignItems="center" gap="8">
      <Text
        color="fg.tertiary"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {label}
      </Text>

      <Box
        bg="bg.default"
        display="grid"
        placeItems="center"
        rounded="sm"
        size="80"
        {...props}
      />
    </Flex>
  );
};
