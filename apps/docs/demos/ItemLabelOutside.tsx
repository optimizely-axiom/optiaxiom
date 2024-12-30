import { Box, Flex, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const ItemLabelOutside = ({
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
        bg="bg.information"
        display="grid"
        placeItems="center"
        size="56"
        {...props}
      />
    </Flex>
  );
};
