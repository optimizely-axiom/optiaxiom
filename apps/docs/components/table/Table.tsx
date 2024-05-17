import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Table = ({
  children,
  className = "",
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box maxW="full" mt="24" {...props}>
    <table className={`nx-w-full nx-text-sm nx-text-left ${className}`}>
      {children}
    </table>
  </Box>
);
