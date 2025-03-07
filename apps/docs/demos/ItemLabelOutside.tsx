import { Box, Flex, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const ItemLabelOutside = ({
  children,
  ...props
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Flex alignItems="center" gap="8">
      <Text
        color="fg.tertiary"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {children.props.children}
      </Text>

      <Box
        bg="bg.avatar.purple"
        display="grid"
        placeItems="center"
        rounded="sm"
        size="56"
        {...props}
        {...children.props}
      >
        {null}
      </Box>
    </Flex>
  );
};
