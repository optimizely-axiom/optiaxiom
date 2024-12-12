import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="link.fg.visited"
      border="2"
      borderColor="fg.default.inverse"
      display="grid"
      ml="-12"
      placeItems="center"
      rounded="full"
      size="56"
      {...children.props}
    >
      <Text color="fg.default.inverse" fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
