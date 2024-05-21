import { Box, Stack } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Stack alignItems="center" gap="8">
    <Box
      asChild
      bg="surface"
      border="1"
      color="text"
      display="grid"
      fontFamily="sans"
      fontSize="md"
      fontWeight="500"
      outline="none"
      outlineColor="purple.500"
      placeItems="center"
      px="16"
      py="8"
      rounded="md"
      shadow="none"
      textAlign="center"
      {...children.props}
    >
      <button>{children.props.children}</button>
    </Box>
  </Stack>
);
