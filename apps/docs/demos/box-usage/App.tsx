import { Box, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      bg="bg.information"
      m="lg"
      p="lg"
      rounded="sm"
      style={{
        border: `1px solid oklch(from ${theme.color["blue.600"]} calc(l + 0.2) c h)`,
        padding: theme.space.md,
      }}
    >
      This is a Box
    </Box>
  );
}
