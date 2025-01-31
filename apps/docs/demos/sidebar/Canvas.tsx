import type { ReactNode } from "react";

import { Box } from "@optiaxiom/react";

const mapSizeToHeight = {
  sm: "200px",
  lg: "75vh",
  auto: undefined,
} as const;

export function Canvas({
  children,
  size = "lg",
}: {
  children: ReactNode;
  size?: "auto" | "lg" | "sm";
}) {
  return (
    <Box
      bg="bg.page"
      p="24"
      style={{ height: mapSizeToHeight[size], width: "600px" }}
    >
      {children}
    </Box>
  );
}
