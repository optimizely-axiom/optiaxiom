import { Box, Stack, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Stack gap={1} items="center">
    <Box
      background="purple.500"
      display="grid"
      placeItems="center"
      size={8}
      {...children.props}
    >
      <Text color="white" fontFamily="mono" fontWeight={600} textAlign="center">
        {children.props.children}
      </Text>
    </Box>
  </Stack>
);
