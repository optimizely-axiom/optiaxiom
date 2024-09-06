import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Table = ({
  children,
  className = "",
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box border="1" maxW="full" mt="24" rounded="lg" {...props}>
    <table className={`nx-w-full nx-text-sm nx-text-left ${className}`}>
      {children}
    </table>
  </Box>
);
