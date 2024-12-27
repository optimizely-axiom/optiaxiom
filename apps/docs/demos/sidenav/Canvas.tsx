import type { ReactNode } from "react";

import { Box } from "@optiaxiom/react";

export function Canvas({ children }: { children: ReactNode }) {
  return (
    <Box bg="bg.page" p="24" style={{ height: "75vh" }} w="384">
      {children}
    </Box>
  );
}
