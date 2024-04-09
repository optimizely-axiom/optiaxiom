import { Box, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      background="bg.information"
      borderRadius="sm"
      margin="lg"
      padding="lg"
      style={{
        border: `1px solid oklch(from ${theme.color["blue.600"]} calc(l + 0.2) c h)`,
        padding: theme.space.md,
      }}
    >
      This is a Box
    </Box>
  );
}
