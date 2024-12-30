import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const ItemLabelInside = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="bg.avatar.purple"
      display="grid"
      p="16"
      placeItems="center"
      rounded="sm"
      {...children.props}
    >
      <Text fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
