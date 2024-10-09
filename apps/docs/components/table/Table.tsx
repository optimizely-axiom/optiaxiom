import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Table = ({
  children,
  className = "",
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box
    bg="bg.default"
    border="1"
    fontSize="md"
    maxW="full"
    mt="24"
    overflow="auto"
    rounded="lg"
    {...props}
  >
    <Box asChild w="full">
      <table className={className}>{children}</table>
    </Box>
  </Box>
);
