import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box bg="bg.information" p="16" rounded="inherit" {...children.props}>
      <Text
        color="fg.white"
        fontFamily="mono"
        fontWeight="600"
        textAlign="center"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
