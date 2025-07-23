import { Box, type BoxProps, Heading } from "@optiaxiom/react";

export function Panel({ children, ...props }: BoxProps) {
  return (
    <Box
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      p="12"
      rounded="md"
      {...props}
    >
      <Heading fontSize="md">{children}</Heading>
    </Box>
  );
}
