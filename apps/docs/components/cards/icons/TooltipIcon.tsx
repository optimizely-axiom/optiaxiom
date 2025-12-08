import { Box, Group } from "@optiaxiom/react";

import { IconButton } from "./IconButton";

export const TooltipIcon = () => (
  <Group alignItems="center" flexDirection="column" gap="4" w="56">
    <Box
      bg="bg.default.inverse"
      p="6"
      rounded="sm"
      style={{ position: "relative" }}
      w="lg"
    >
      <Box
        bg="bg.default.inverse"
        style={{
          bottom: "-2px",
          height: "4px",
          insetInline: "0",
          margin: "auto",
          position: "absolute",
          rotate: "45deg",
          width: "4px",
        }}
      />
    </Box>

    <IconButton />
  </Group>
);
