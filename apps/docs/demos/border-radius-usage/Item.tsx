import { Box, Stack, Text } from "@optiaxiom/react";
import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
} from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => (
  <Stack align="center" gap={1}>
    {cloneElement(
      children,
      {
        background: "purple.500",
        place: "center",
        size: 8,
      },
      <Text color="white" fontFamily="mono" fontWeight={600} textAlign="center">
        {children.props.children}
      </Text>,
    )}
  </Stack>
);
