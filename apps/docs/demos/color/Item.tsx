import { Box, Flex } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Flex alignItems="center" gap="8">
    <Box
      asChild
      fontSize="lg"
      fontWeight="500"
      textAlign="center"
      {...children.props}
    >
      <button>{children.props.children}</button>
    </Box>
  </Flex>
);
