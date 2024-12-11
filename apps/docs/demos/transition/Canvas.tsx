import type { ComponentPropsWithRef, ReactElement } from "react";

import { Box, Text } from "@optiaxiom/react";

export const Canvas = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      asChild
      display="inline-flex"
      px="16"
      py="12"
      rounded="sm"
      {...children.props}
    >
      <Text color="fg.default" fontWeight="600" textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  );
};
