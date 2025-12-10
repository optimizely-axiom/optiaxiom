import type { ComponentPropsWithRef } from "react";

import { Box, type BoxProps } from "@optiaxiom/react";

type TableProps = BoxProps &
  ComponentPropsWithRef<"table"> & { className?: string };

export const Table = ({ children, className = "", ...props }: TableProps) => (
  <Box
    bg="bg.default"
    border="1"
    borderColor="border.tertiary"
    color="fg.default"
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
