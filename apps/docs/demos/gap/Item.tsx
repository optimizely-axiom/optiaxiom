import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box bg="fg.link.visited" p="md" rounded="inherit" {...children.props}>
      <Text
        color="fg.default.inverse"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
