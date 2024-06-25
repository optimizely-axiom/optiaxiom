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
      color="fg.default.inverse"
      fontSize="md"
      fontWeight="500"
      px="16"
      py="8"
      rounded="md"
      textAlign="center"
      {...children.props}
    >
      <button>{children.props.children}</button>
    </Box>
  </Flex>
);
