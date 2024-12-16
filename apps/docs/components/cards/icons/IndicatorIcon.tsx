import { Box } from "@optiaxiom/react";

import { IconButton } from "./IconButton";

export const IndicatorIcon = () => (
  <Box style={{ position: "relative" }}>
    <IconButton
      intent="primary"
      p="4"
      px="4"
      style={{ position: "absolute", right: "-1px", top: "-1px" }}
    />
    <IconButton intent="secondary" p="10" px="16" />
  </Box>
);
