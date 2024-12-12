import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="bg.success.hovered"
      border="2"
      borderColor="border.disabled"
      display="grid"
      placeItems="center"
      rounded="full"
      size="56"
      style={{ marginLeft: "-12px" }}
      {...children.props}
    >
      <Text color="fg.default.inverse" fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
