import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  const label = children.props.children;

  return (
    <Box
      bg="fg.link.visited"
      display="grid"
      p="xs"
      placeItems="center"
      rounded="sm"
      {...children.props}
    >
      <Text
        color="fg.default.inverse"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {label}
      </Text>
    </Box>
  );
};
